import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: 'HOME',
      path: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      label: '予約一覧',
      path: '/admin/reservations',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      label: '患者情報',
      path: '/admin/users',
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Left Menu */}
      <div className="w-60 bg-[#4169E1] text-white">
        <div className="p-4 font-bold text-lg border-b border-blue-400">
          イークリニック
          <br />
          予約管理システム
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                ? 'bg-white text-[#4169E1]'
                : 'hover:bg-blue-600'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 mt-4"
          >
            ログアウト
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;