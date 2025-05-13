import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import { CourseOption } from '../../types';
import Button from '../ui/Button';

const ReservationInputScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation, updateReservation } = useReservation();
  
  const [company, setCompany] = useState(reservation.company || '');
  const [course, setCourse] = useState<CourseOption | ''>(reservation.course as CourseOption || '');
  const [option, setOption] = useState(reservation.option || '');
  const [notes, setNotes] = useState(reservation.notes || '');
  
  const [errors, setErrors] = useState({
    company: false,
    course: false
  });
  
  if (!reservation.date || !reservation.time) {
    navigate('/');
    return null;
  }
  
  const courseOptions: CourseOption[] = [
    "生活習慣病予防検診",
    "定期健診",
    "法定定期健診",
    "雇用時検診"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      company: !company.trim(),
      course: !course
    };
    
    setErrors(newErrors);
    
    if (newErrors.company || newErrors.course) {
      return;
    }
    
    updateReservation({
      company,
      course,
      option,
      notes
    });
    
    navigate('/reservation-confirmation');
  };
  
  const handleBack = () => {
    navigate('/time-selection');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">予約情報入力</h1>
        <p className="text-gray-600 mt-1">
          {formatDate(reservation.date)} {reservation.time}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            会社名（会社からではない場合、個人と書いてください）{' '}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">会社名は必須です</p>
          )}
        </div>
        
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
            健診コース <span className="text-red-500">*</span>
          </label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value as CourseOption)}
            className={`w-full p-2 border rounded-md ${
              errors.course ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">選択してください</option>
            {courseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.course && (
            <p className="text-red-500 text-sm mt-1">健診コースは必須です</p>
          )}
        </div>
        
        <div>
          <label htmlFor="option" className="block text-sm font-medium text-gray-700 mb-1">
            オプション
          </label>
          <input
            type="text"
            id="option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            備考
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="事前に伝えておきたいことなど"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="pt-4 flex gap-3">
          <Button variant="secondary" onClick={handleBack} fullWidth>
            戻る
          </Button>
          <Button type="submit" fullWidth>
            予約確認画面へ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReservationInputScreen;