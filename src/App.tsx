import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ReservationProvider } from './context/ReservationContext';
import Layout from './components/layout/Layout';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import TimeSelectionScreen from './components/screens/TimeSelectionScreen';
import ReservationInputScreen from './components/screens/ReservationInputScreen';
import ReservationConfirmationScreen from './components/screens/ReservationConfirmationScreen';
import ReservationCompleteScreen from './components/screens/ReservationCompleteScreen';
import MyReservationsScreen from './components/screens/MyReservationsScreen';
import AdminLoginScreen from './components/admin/AdminLoginScreen';
import AdminDashboardScreen from './components/admin/AdminDashboardScreen';
import AdminReservationsScreen from './components/admin/AdminReservationsScreen';
import AdminUsersScreen from './components/admin/AdminUsersScreen';
import AuthGuard from './components/screens/AuthGuard';
import AdminAuthGuard from './components/admin/AdminAuthGuard';

function App() {
  return (
    <ReservationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="/calendar"
              element={
                <AuthGuard>
                  <CalendarScreen />
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <ProfileScreen />
                </AuthGuard>
              }
            />
            <Route
              path="/time-selection"
              element={
                <AuthGuard>
                  <TimeSelectionScreen />
                </AuthGuard>
              }
            />
            <Route
              path="/reservation-input"
              element={
                <AuthGuard>
                  <ReservationInputScreen />
                </AuthGuard>
              }
            />
            <Route
              path="/reservation-confirmation"
              element={
                <AuthGuard>
                  <ReservationConfirmationScreen />
                </AuthGuard>
              }
            />
            <Route
              path="/reservation-complete"
              element={
                <AuthGuard>
                  <ReservationCompleteScreen />
                </AuthGuard>
              }
            />
            <Route
              path="/my-reservations"
              element={
                <AuthGuard>
                  <MyReservationsScreen />
                </AuthGuard>
              }
            />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginScreen />} />
            <Route
              path="/admin"
              element={
                <AdminAuthGuard>
                  <AdminDashboardScreen />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <AdminAuthGuard>
                  <AdminReservationsScreen />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminAuthGuard>
                  <AdminUsersScreen />
                </AdminAuthGuard>
              }
            />
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ReservationProvider>
  );
}

export default App;