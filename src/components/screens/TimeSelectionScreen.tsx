import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate, getTimeSlots } from '../../utils/dateUtils';
import Button from '../ui/Button';

const TimeSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation, updateReservation } = useReservation();
  const timeSlots = getTimeSlots();
  
  if (!reservation.date || !reservation.course) {
    navigate('/');
    return null;
  }
  
  const handleTimeSelect = (time: string) => {
    updateReservation({ time });
    navigate('/reservation-input');
  };
  
  const handleBack = () => {
    navigate('/course-selection');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">時間を選択してください</h1>
        <div className="text-gray-600 mt-1 space-y-1">
          <p>{formatDate(reservation.date)}</p>
          <p className="text-sm">健診コース: {reservation.course}</p>
        </div>
      </div>
      
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