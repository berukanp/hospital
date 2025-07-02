export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Reservation {
  date: Date | null;
  time: string;
  company: string;
  course: string;
  option: string;
  notes: string;
  userName: string;
  userPhone: string;
  userEmail: string;
}

export interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  insurance?: string;
  insuranceType?: 'self' | 'family';
  insuranceNumber?: string;
  insuranceId?: string;
  gender?: string;
  birthDate?: string;
  languageLevel?: string;
  otherLanguages?: string;
}

export type CourseOption = 
  | "生活習慣病予防健診"
  | "定期健診"
  | "法定定期健診"
  | "雇用時健診"
  | "簡易健診"
  | "特定健診"
  | "電離放射線健診"
  | "長時間勤務健診"
  | "その他";