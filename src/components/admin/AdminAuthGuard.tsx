import React from 'react';
import { Navigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user } = useReservation();

  if (!user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;