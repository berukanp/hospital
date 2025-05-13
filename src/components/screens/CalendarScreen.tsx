import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../ui/Calendar';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';

const CalendarScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateReservation } = useReservation();
  
  const handleDateSelect = (date: Date) => {
    updateReservation({ date });
    navigate('/time-selection');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">予約日を選択してください</h1>
      <Calendar onDateSelect={handleDateSelect} />
    </div>
  );
};

export default CalendarScreen;