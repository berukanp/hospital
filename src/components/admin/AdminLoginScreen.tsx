import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import Button from '../ui/Button';

const AdminLoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useReservation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }

    // For demo purposes, use a hardcoded admin credential
    if (email === 'admin@example.com' && password === 'admin123') {
      updateUser({
        isAuthenticated: true,
        isAdmin: true,
        email: email,
        fullName: '管理者',
      });
      navigate('/admin');
    } else {
      setError('メールアドレスまたはパスワードが正しくありません');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-8">管理者ログイン</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button type="submit" fullWidth>
          ログイン
        </Button>
      </form>
    </div>
  );
};

export default AdminLoginScreen;