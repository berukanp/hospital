import { createContext, useContext, useState, ReactNode } from 'react';
import { Reservation, User } from '../types';

interface ReservationContextType {
  reservation: Reservation;
  user: User;
  updateReservation: (data: Partial<Reservation>) => void;
  updateUser: (data: Partial<User>) => void;
  resetReservation: () => void;
  myReservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (index: number) => void;
}

const defaultReservation: Reservation = {
  date: null,
  time: '',
  company: '',
  course: '',
  option: '',
  notes: '',
  userName: '',
  userPhone: '',
  userEmail: '',
};

const defaultUser: User = {
  fullName: '',
  phoneNumber: '',
  email: '',
  isAuthenticated: false,
};

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservation, setReservation] = useState<Reservation>(defaultReservation);
  const [user, setUser] = useState<User>(defaultUser);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);

  const updateReservation = (data: Partial<Reservation>) => {
    setReservation(prev => ({ ...prev, ...data }));
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const resetReservation = () => {
    setReservation(defaultReservation);
  };

  const addReservation = (newReservation: Reservation) => {
    setMyReservations(prev => [...prev, newReservation]);
  };

  const cancelReservation = (index: number) => {
    setMyReservations(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <ReservationContext.Provider value={{
      reservation,
      user,
      updateReservation,
      updateUser,
      resetReservation,
      myReservations,
      addReservation,
      cancelReservation
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};