import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import Button from '../ui/Button';
import { CheckCircle } from 'lucide-react';

const ReservationCompleteScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation } = useReservation();
  
  if (!reservation.date || !reservation.time) {
    navigate('/');
    return null;
  }
  
  const handleGoToMyReservations = () => {
    navigate('/my-reservations');
  };
  
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle size={64} className="text-green-500" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800">
        予約が完了しました
      </h1>
      
      <p className="text-lg font-medium">
        {formatDate(reservation.date)} {reservation.time}
      </p>
      
      <div className="bg-white p-4 rounded-lg shadow-sm text-left">
        <div className="space-y-2">
          <div>
            <span className="font-medium">お名前：</span>
            <span>{reservation.userName}</span>
          </div>
          <div>
            <span className="font-medium">電話番号：</span>
            <span>{reservation.userPhone}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button onClick={handleGoToMyReservations} fullWidth>
          マイ予約へ
        </Button>
      </div>
    </div>
  );
};

export default ReservationCompleteScreen;