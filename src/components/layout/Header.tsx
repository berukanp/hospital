import React from 'react';
import { useReservation } from '../../context/ReservationContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, updateUser } = useReservation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    updateUser({ isAuthenticated: false });
    navigate('/login');
  };
  
  const handleMyReservations = () => {
    navigate('/my-reservations');
  };

  const handleProfile = () => {
    navigate('/profile');
  };
  
  return (
    <header className="bg-blue-600 py-3 px-4 w-full flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        病院予約システム
      </div>
      <div className="flex space-x-2">
        {user.isAuthenticated && (
          <>
            <button
              onClick={handleProfile}
              className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded-md text-sm transition-colors"
            >
              登録情報
            </button>
            <button
              onClick={handleMyReservations}
              className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded-md text-sm transition-colors"
            >
              マイ予約
            </button>
          </>
        )}
        
        {user.isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded-md text-sm transition-colors"
          >
            ログアウト
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded-md text-sm transition-colors"
          >
            ログイン
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;