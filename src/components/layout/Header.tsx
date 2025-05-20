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
    <header className="bg-[#4169E1] py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate(user.isAdmin ? '/admin' : '/')}
        >
          {user.isAdmin ? 'イークリニック予約管理システム' : 'イークリニック予約システム'}
        </div>
        <div className="flex space-x-4">
          {user.isAuthenticated && !user.isAdmin && (
            <>
              <button
                onClick={handleProfile}
                className="text-white hover:text-blue-100 transition-colors"
              >
                登録情報
              </button>
              <button
                onClick={handleMyReservations}
                className="text-white hover:text-blue-100 transition-colors"
              >
                マイ予約
              </button>
            </>
          )}
          
          {user.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-100 transition-colors"
            >
              ログアウト
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-blue-100 transition-colors"
            >
              ログイン
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;