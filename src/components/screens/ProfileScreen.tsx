import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import Button from '../ui/Button';

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

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useReservation();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    nameKana: '',
    insurance: user.insurance || '',
    insuranceType: user.insuranceType || 'self',
    kyoukaiKenpoInfo: '',
    insuranceNumber: user.insuranceNumber || '',
    insuranceId: user.insuranceId || '',
    gender: user.gender || '',
    birthDate: user.birthDate || '',
    phone: user.phoneNumber || '',
    email: user.email || '',
    languageLevel: user.languageLevel || '',
    otherLanguages: user.otherLanguages || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    const requiredFields = ['fullName', 'nameKana', 'insurance', 'gender', 'birthDate', 'email'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      setError('必須項目を入力してください');
      return;
    }

    // Update user information
    updateUser({
      ...user,
      fullName: formData.fullName,
      phoneNumber: formData.phone,
      email: formData.email,
      insurance: formData.insurance,
      insuranceType: formData.insuranceType as 'self' | 'family',
      insuranceNumber: formData.insuranceNumber,
      insuranceId: formData.insuranceId,
      gender: formData.gender,
      birthDate: formData.birthDate,
      languageLevel: formData.languageLevel,
      otherLanguages: formData.otherLanguages
    });

    navigate('/');
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-8">登録情報の編集</h1>

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
          <textarea
            id="kyoukaiKenpoInfo"
            name="kyoukaiKenpoInfo"
            value={formData.kyoukaiKenpoInfo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
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

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/')} fullWidth>
            戻る
          </Button>
          <Button type="submit" fullWidth>
            更新する
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileScreen;