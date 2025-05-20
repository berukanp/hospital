import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useReservation } from '../../context/ReservationContext';
import { formatDate, generateCalendarDays } from '../../utils/dateUtils';
import AdminLayout from './AdminLayout';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const AdminDashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { myReservations } = useReservation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const days = generateCalendarDays(year, month);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const getTodayReservations = () => {
    const today = new Date();
    return myReservations.filter(res => {
      if (!res.date) return false;
      const resDate = new Date(res.date);
      return resDate.toDateString() === today.toDateString();
    }).sort((a, b) => {
      if (!a.time || !b.time) return 0;
      return a.time.localeCompare(b.time);
    });
  };

  const getReservationsForDate = (date: Date) => {
    return myReservations.filter(res => {
      if (!res.date) return false;
      const resDate = new Date(res.date);
      return resDate.toDateString() === date.toDateString();
    });
  };

  const todayReservations = getTodayReservations();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">管理画面</h1>

        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span>前月</span>
            </button>
            
            <h2 className="text-xl font-bold">
              {year}年 {month + 1}月
            </h2>
            
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span>翌月</span>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {weekdays.map((day, index) => (
              <div 
                key={index} 
                className={`text-center py-2 font-semibold ${
                  index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="p-3"></div>;
              }
              
              const date = new Date(year, month, day);
              const reservations = getReservationsForDate(date);
              const isToday = new Date().toDateString() === date.toDateString();
              
              return (
                <div 
                  key={`day-${day}`} 
                  className={`min-h-[100px] p-2 border border-gray-100 ${
                    isToday ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    date.getDay() === 0 ? 'text-red-500' : 
                    date.getDay() === 6 ? 'text-blue-500' : ''
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {reservations.map((res, i) => (
                      <div key={i} className="text-xs">
                        <span className="text-gray-500">{res.time?.split(' - ')[0]}</span>
                        <span className="ml-1 text-blue-600">{res.userName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Reservations */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">本日の予約</h2>
          
          {todayReservations.length === 0 ? (
            <p className="text-gray-500 text-center py-4">本日の予約はありません</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Morning Section */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">午前</h3>
                  <div className="space-y-2">
                    {todayReservations
                      .filter(res => res.time && parseInt(res.time.split(':')[0]) < 12)
                      .map((res, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <span className="text-sm text-gray-500">{res.time}</span>
                            <span className="ml-2">{res.userName}</span>
                          </div>
                          <Badge variant="success">確定</Badge>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Afternoon Section */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">午後</h3>
                  <div className="space-y-2">
                    {todayReservations
                      .filter(res => res.time && parseInt(res.time.split(':')[0]) >= 12)
                      .map((res, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <span className="text-sm text-gray-500">{res.time}</span>
                            <span className="ml-2">{res.userName}</span>
                          </div>
                          <Badge variant="success">確定</Badge>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button onClick={() => navigate('/calendar')} fullWidth>
                  <Plus className="h-4 w-4 mr-2" />
                  新規予約を追加
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardScreen;