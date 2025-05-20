import React from 'react';
import AdminLayout from './AdminLayout';

const AdminUsersScreen: React.FC = () => {
  // Dummy user data for demonstration
  const users = [
    {
      id: 1,
      name: '山田 太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
      insurance: '社会保険',
      registeredDate: '2024-03-15'
    },
    {
      id: 2,
      name: '佐藤 花子',
      email: 'sato@example.com',
      phone: '090-8765-4321',
      insurance: '国民健康保険',
      registeredDate: '2024-03-14'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">ユーザー一覧</h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  名前
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メールアドレス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  電話番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  保険種別
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  登録日
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.insurance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.registeredDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersScreen;