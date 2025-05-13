import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import Button from '../ui/Button';

const ReservationConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation, user, updateReservation, addReservation } = useReservation();
  
  const [userName, setUserName] = useState(user.fullName);
  const [userPhone, setUserPhone] = useState(user.phoneNumber);
  const [userEmail, setUserEmail] = useState(user.email);
  
  const [errors, setErrors] = useState({
    userName: false,
    userPhone: false,
    userEmail: false
  });
  
  if (!reservation.date || !reservation.time) {
    navigate('/');
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      userName: !userName.trim(),
      userPhone: !userPhone.trim(),
      userEmail: !userEmail.trim()
    };
    
    setErrors(newErrors);
    
    if (newErrors.userName || newErrors.userPhone || newErrors.userEmail) {
      return;
    }
    
    const completeReservation = {
      ...reservation,
      userName,
      userPhone,
      userEmail
    };
    
    updateReservation(completeReservation);
    addReservation(completeReservation);
    
    navigate('/reservation-complete');
  };
  
  const handleBack = () => {
    navigate('/reservation-input');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">
        以下の内容で予約を確定します
      </h1>
      
      <div className="bg-blue-50 rounded-lg p-4 space-y-2">
        <div className="grid grid-cols-3 gap-1">
          <span className="text-gray-600">日付：</span>
          <span className="col-span-2 font-medium">{formatDate(reservation.date)}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <span className="text-gray-600">時間：</span>
          <span className="col-span-2 font-medium">{reservation.time}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <span className="text-gray-600">健診コース：</span>
          <span className="col-span-2 font-medium">{reservation.course}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <span className="text-gray-600">オプション：</span>
          <span className="col-span-2 font-medium">{reservation.option || '特になし'}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <span className="text-gray-600">備考：</span>
          <span className="col-span-2 font-medium">{reservation.notes || '特になし'}</span>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-3">予約者情報</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="例：山田太郎"
              className={`w-full p-2 border rounded-md ${
                errors.userName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">お名前は必須です</p>
            )}
          </div>
          
          <div>
            <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="userPhone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="例：09012345678"
              className={`w-full p-2 border rounded-md ${
                errors.userPhone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.userPhone && (
              <p className="text-red-500 text-sm mt-1">電話番号は必須です</p>
            )}
          </div>
          
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="例：example@email.com"
              className={`w-full p-2 border rounded-md ${
                errors.userEmail ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">メールアドレスは必須です</p>
            )}
          </div>
          
          <div className="pt-4 flex gap-3">
            <Button variant="secondary" onClick={handleBack} fullWidth>
              戻る
            </Button>
            <Button type="submit" fullWidth>
              予約を確定する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationConfirmationScreen;