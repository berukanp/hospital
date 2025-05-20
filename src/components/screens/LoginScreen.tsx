import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import Button from '../ui/Button';

const LoginScreen: React.FC = () => {
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

    // Check if this is an admin login
    if (email === 'admin@example.com' && password === 'admin123') {
      updateUser({
        isAuthenticated: true,
        isAdmin: true,
        email: email,
        fullName: '管理者'
      });
      navigate('/admin');
      return;
    }

    // Regular user login
    updateUser({
      isAuthenticated: true,
      isAdmin: false,
      email: email,
      fullName: '山田 太郎',
      phoneNumber: '09012345678'
    });
    navigate('/calendar');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-8">ログイン</h1>
      
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@email.com"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button type="submit" fullWidth>
          ログイン
        </Button>

        <div className="text-center space-y-2">
          <div>
            <Link to="/signup" className="block text-sm text-blue-600 hover:text-blue-800">
              新規登録はこちら
            </Link>
          </div>
          <div>
            <Link to="/forgot-password" className="block text-sm text-blue-600 hover:text-blue-800">
              パスワードをお忘れですか？
            </Link>
          </div>
          <div>
            <Link to="/admin/login" className="block text-sm text-blue-600 hover:text-blue-800">
              管理者ログインはこちら
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;