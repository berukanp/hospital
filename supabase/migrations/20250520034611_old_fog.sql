/*
  # Initial database schema for hospital reservation system

  1. New Tables
    - users (extends Supabase Auth)
    - patients (patient specific information)
    - courses (available medical examination courses)
    - time_slots_master (available time slots)
    - appointments (reservation records)
    - facility_settings (clinic settings)
    - default_closure_rules (regular closure days)
    - special_closure_days (special holidays)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for admin users

  3. Initial Data
    - Insert default courses
    - Insert default time slots
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'admin');
CREATE TYPE insurance_type AS ENUM ('国民健康保険', '社会保険', '共済保険', '後期高齢者医療制度');
CREATE TYPE insured_person_type AS ENUM ('本人', '家族');
CREATE TYPE gender_type AS ENUM ('男性', '女性', 'その他');
CREATE TYPE time_period AS ENUM ('morning', 'afternoon');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE language_skill AS ENUM ('日本語', '英語', '中国語', '韓国語');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'patient',
  full_name TEXT NOT NULL,
  full_name_kana TEXT NOT NULL,
  phone_number TEXT,
  email TEXT UNIQUE NOT NULL,
  language_skill language_skill DEFAULT '日本語',
  other_languages TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Patients table
CREATE TABLE patients (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  insurance_type insurance_type NOT NULL,
  insured_person insured_person_type NOT NULL,
  association_insurance_note TEXT,
  insured_certificate_number TEXT,
  insurer_number TEXT,
  gender gender_type NOT NULL,
  birthday DATE NOT NULL
);

-- Courses table
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- Time slots master
CREATE TABLE time_slots_master (
  id SERIAL PRIMARY KEY,
  period time_period NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  UNIQUE(start_time, end_time)
);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_slot_id INTEGER NOT NULL REFERENCES time_slots_master(id),
  course_id INTEGER NOT NULL REFERENCES courses(id),
  company TEXT NOT NULL,
  option TEXT,
  notes TEXT,
  status appointment_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(date, time_slot_id)
);

-- Facility settings
CREATE TABLE facility_settings (
  id SERIAL PRIMARY KEY,
  facility_name TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  prefecture_city TEXT NOT NULL,
  address_rest TEXT NOT NULL,
  representative_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  booking_start_days_before INTEGER NOT NULL DEFAULT 30,
  booking_deadline_days_before INTEGER NOT NULL DEFAULT 1
);

-- Default closure rules
CREATE TABLE default_closure_rules (
  id SERIAL PRIMARY KEY,
  weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  time_slot_id INTEGER REFERENCES time_slots_master(id),
  UNIQUE(weekday, time_slot_id)
);

-- Special closure days
CREATE TABLE special_closure_days (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time_slot_id INTEGER REFERENCES time_slots_master(id),
  description TEXT,
  UNIQUE(date, time_slot_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE default_closure_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_closure_days ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Patients policies
CREATE POLICY "Patients can read own data" ON patients
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Patients can update own data" ON patients
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can read courses" ON courses
  FOR SELECT TO authenticated
  USING (true);

-- Time slots policies
CREATE POLICY "Anyone can read time slots" ON time_slots_master
  FOR SELECT TO authenticated
  USING (true);

-- Appointments policies
CREATE POLICY "Users can read own appointments" ON appointments
  FOR SELECT TO authenticated
  USING (
    patient_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can create own appointments" ON appointments
  FOR INSERT TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Users can update own appointments" ON appointments
  FOR UPDATE TO authenticated
  USING (
    patient_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    patient_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND role = 'admin')
  );

-- Facility settings policies
CREATE POLICY "Anyone can read facility settings" ON facility_settings
  FOR SELECT TO authenticated
  USING (true);

-- Closure rules policies
CREATE POLICY "Anyone can read closure rules" ON default_closure_rules
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Anyone can read special closure days" ON special_closure_days
  FOR SELECT TO authenticated
  USING (true);

-- Insert initial data
INSERT INTO courses (name) VALUES
  ('生活習慣病予防検診'),
  ('定期健診'),
  ('法定定期健診'),
  ('雇用時検診');

INSERT INTO time_slots_master (period, start_time, end_time) VALUES
  ('morning', '09:00', '09:30'),
  ('morning', '09:30', '10:00'),
  ('morning', '10:00', '10:30'),
  ('morning', '11:00', '11:30'),
  ('afternoon', '15:30', '16:00'),
  ('afternoon', '16:00', '16:30'),
  ('afternoon', '16:30', '17:00');

-- Insert default closure rules (Sundays and Saturday afternoons)
INSERT INTO default_closure_rules (weekday, time_slot_id)
SELECT 0, id FROM time_slots_master; -- Sunday (all day)

INSERT INTO default_closure_rules (weekday, time_slot_id)
SELECT 6, id FROM time_slots_master WHERE period = 'afternoon'; -- Saturday afternoon

-- Insert facility settings
INSERT INTO facility_settings (
  facility_name,
  postal_code,
  prefecture_city,
  address_rest,
  representative_name,
  contact_phone,
  contact_email
) VALUES (
  'イークリニック',
  '123-4567',
  '東京都渋谷区',
  '代々木1-1-1',
  '山田太郎',
  '03-1234-5678',
  'info@eclinic.example.com'
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();