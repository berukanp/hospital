import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate, getTimeSlots } from '../../utils/dateUtils';
import Button from '../ui/Button';

const TimeSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation, updateReservation } = useReservation();
  const timeSlots = getTimeSlots();
  
  if (!reservation.date) {
    navigate('/');
    return null;
  }
  
  const handleTimeSelect = (time: string) => {
    updateReservation({ time });
    navigate('/reservation-input');
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">
        {formatDate(reservation.date)}
      </h1>
      <p className="text-gray-600">以下から希望の時間帯を選択してください</p>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">午前</h2>
        <div className="space-y-2">
          {timeSlots.slice(0, 4).map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className="w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md font-medium transition-colors text-center"
            >
              {time}
            </button>
          ))}
        </div>
        
        <h2 className="text-lg font-medium text-gray-700 mt-6">午後</h2>
        <div className="space-y-2">
          {timeSlots.slice(4).map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className="w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md font-medium transition-colors text-center"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <Button variant="secondary" onClick={handleBack} fullWidth>
          戻る
        </Button>
      </div>
    </div>
  );
};

export default TimeSelectionScreen;