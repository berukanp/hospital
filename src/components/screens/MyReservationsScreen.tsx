import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const MyReservationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { myReservations, cancelReservation } = useReservation();
  
  const handleNewReservation = () => {
    navigate('/');
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleCancelReservation = (index: number) => {
    if (window.confirm('この予約をキャンセルしますか？')) {
      cancelReservation(index);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">マイ予約</h1>
      
      {myReservations.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">予約がありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myReservations.map((res, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg">
                  {res.date && formatDate(res.date)}
                </h2>
                <Badge variant="success">確定</Badge>
              </div>
              
              <div className="space-y-1 text-sm mb-4">
                <p>
                  <span className="font-medium">時間: </span>
                  <span>{res.time}</span>
                </p>
                <p>
                  <span className="font-medium">健診コース: </span>
                  <span>{res.course}</span>
                </p>
                <p>
                  <span className="font-medium">オプション: </span>
                  <span>{res.option || '特になし'}</span>
                </p>
                <p>
                  <span className="font-medium">備考: </span>
                  <span>{res.notes || '特になし'}</span>
                </p>
              </div>
              
              <button
                onClick={() => handleCancelReservation(index)}
                className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
              >
                キャンセルする
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="pt-4 flex flex-col gap-3">
        <Button variant="secondary" onClick={handleBack} fullWidth>
          戻る
        </Button>
        <Button onClick={handleNewReservation} fullWidth>
          新しい予約を登録する
        </Button>
      </div>
    </div>
  );
};

export default MyReservationsScreen;