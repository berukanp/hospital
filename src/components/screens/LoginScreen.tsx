import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    // For demo purposes, any valid email/password combination works
    updateUser({
      isAuthenticated: true,
      email: email,
      fullName: '山田 太郎',
      phoneNumber: '09012345678'
    });
    navigate('/');
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
          <a href="/signup" className="text-sm text-blue-600 hover:text-blue-800">
            新規登録はこちら
          </a>
          <div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              パスワードをお忘れですか？
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;