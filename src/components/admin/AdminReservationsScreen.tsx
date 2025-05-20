import React from 'react';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import AdminLayout from './AdminLayout';
import Badge from '../ui/Badge';

const AdminReservationsScreen: React.FC = () => {
  const { myReservations } = useReservation();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">予約一覧</h1>
        
        {myReservations.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">予約がありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myReservations.map((res, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg">
                      {res.date && formatDate(res.date)}
                    </h2>
                    <p className="text-gray-600">{res.time}</p>
                  </div>
                  <Badge variant="success">確定</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">予約者</p>
                    <p>{res.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">電話番号</p>
                    <p>{res.userPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">メール</p>
                    <p>{res.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">会社名</p>
                    <p>{res.company}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">健診コース</p>
                    <p>{res.course}</p>
                  </div>
                  {res.option && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">オプション</p>
                      <p>{res.option}</p>
                    </div>
                  )}
                  {res.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">備考</p>
                      <p>{res.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReservationsScreen;