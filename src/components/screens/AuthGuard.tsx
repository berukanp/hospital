import React from 'react';
import { Navigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useReservation();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;