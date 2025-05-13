import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import Button from '../ui/Button';

interface FormData {
  fullName: string;
  nameKana: string;
  insurance: string;
  insuranceType: 'self' | 'family';
  kyoukaiKenpoInfo: string;
  insuranceNumber: string;
  insuranceId: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  languageLevel: string;
  otherLanguages: string;
  password: string;
  confirmPassword: string;
}

const insuranceOptions = [
  '国民健康保険',
  '社会保険',
  '共済保険',
  '後期高齢者医療制度',
  'その他'
];

const languageOptions = [
  '日本語',
  '英語',
  '中国語',
  '韓国語'
];

const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useReservation();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nameKana: '',
    insurance: '',
    insuranceType: 'self',
    kyoukaiKenpoInfo: '',
    insuranceNumber: '',
    insuranceId: '',
    gender: '',
    birthDate: '',
    phone: '',
    email: '',
    languageLevel: '',
    otherLanguages: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    const requiredFields: (keyof FormData)[] = [
      'fullName',
      'nameKana',
      'insurance',
      'gender',
      'birthDate',
      'email',
      'password',
      'confirmPassword'
    ];

    const emptyFields = requiredFields.filter(field => !formData[field]);
    if (emptyFields.length > 0) {
      setError('必須項目を入力してください');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    // For demo purposes, create the user and log them in
    updateUser({
      isAuthenticated: true,
      email: formData.email,
      fullName: formData.fullName,
      phoneNumber: formData.phone,
      insurance: formData.insurance,
      insuranceType: formData.insuranceType,
      insuranceNumber: formData.insuranceNumber,
      insuranceId: formData.insuranceId,
      gender: formData.gender,
      birthDate: formData.birthDate,
      languageLevel: formData.languageLevel,
      otherLanguages: formData.otherLanguages
    });

    navigate('/calendar');
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-8">新規登録</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="nameKana" className="block text-sm font-medium text-gray-700 mb-1">
            お名前カナ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nameKana"
            name="nameKana"
            value={formData.nameKana}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
            持っている保険証 <span className="text-red-500">*</span>
          </label>
          <select
            id="insurance"
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">選択してください</option>
            {insuranceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            被保険者は <span className="text-red-500">*</span>
          </label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="insuranceType"
                value="self"
                checked={formData.insuranceType === 'self'}
                onChange={handleChange}
                className="mr-2"
              />
              本人
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="insuranceType"
                value="family"
                checked={formData.insuranceType === 'family'}
                onChange={handleChange}
                className="mr-2"
              />
              家族
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="kyoukaiKenpoInfo" className="block text-sm font-medium text-gray-700 mb-1">
            協会けんぽ保険証を持つ方必ずご入力ください
          </label>
          <input
            type="text"
            id="kyoukaiKenpoInfo"
            name="kyoukaiKenpoInfo"
            value={formData.kyoukaiKenpoInfo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="insuranceNumber" className="block text-sm font-medium text-gray-700 mb-1">
            被保険者証番号
          </label>
          <input
            type="text"
            id="insuranceNumber"
            name="insuranceNumber"
            value={formData.insuranceNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="insuranceId" className="block text-sm font-medium text-gray-700 mb-1">
            保険者番号
          </label>
          <input
            type="text"
            id="insuranceId"
            name="insuranceId"
            value={formData.insuranceId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            性別 <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            生年月日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            電話番号
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="09012345678"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label htmlFor="languageLevel" className="block text-sm font-medium text-gray-700 mb-1">
            語学力
          </label>
          <select
            id="languageLevel"
            name="languageLevel"
            value={formData.languageLevel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">選択してください</option>
            {languageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="otherLanguages" className="block text-sm font-medium text-gray-700 mb-1">
            他の理解できる言語
          </label>
          <input
            type="text"
            id="otherLanguages"
            name="otherLanguages"
            value={formData.otherLanguages}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード（確認） <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button type="submit" fullWidth>
          登録する
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            ログイン画面に戻る
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupScreen;