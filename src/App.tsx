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
import AuthGuard from './components/screens/AuthGuard';

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
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ReservationProvider>
  );
}

export default App;