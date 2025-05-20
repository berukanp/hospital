import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar } from 'lucide-react';
import Button from '../ui/Button';

const AdminDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '予約管理',
      description: '予約の確認、編集、キャンセル',
      icon: Calendar,
      path: '/admin/reservations'
    },
    {
      title: 'ユーザー管理',
      description: 'ユーザー情報の確認、編集',
      icon: Users,
      path: '/admin/users'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">管理画面</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <item.icon className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <Button onClick={() => navigate(item.path)} fullWidth>
              表示する
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardScreen;