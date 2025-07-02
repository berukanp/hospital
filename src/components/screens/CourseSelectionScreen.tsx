import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import { CourseOption } from '../../types';
import Button from '../ui/Button';

const CourseSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation, updateReservation } = useReservation();
  const [selectedCourse, setSelectedCourse] = useState<CourseOption | ''>(reservation.course as CourseOption || '');
  const [error, setError] = useState(false);
  
  if (!reservation.date) {
    navigate('/');
    return null;
  }
  
  const courseOptions: CourseOption[] = [
    "生活習慣病予防健診",
    "定期健診",
    "法定定期健診",
    "雇用時健診",
    "簡易健診",
    "特定健診",
    "電離放射線健診",
    "長時間勤務健診",
    "その他"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      setError(true);
      return;
    }
    
    updateReservation({ course: selectedCourse });
    navigate('/time-selection');
  };
  
  const handleBack = () => {
    navigate('/calendar');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">健診コースを選択してください</h1>
        <p className="text-gray-600 mt-1">
          {formatDate(reservation.date)}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-3">
            健診コース <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {courseOptions.map((course) => (
              <label
                key={course}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCourse === course
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="course"
                  value={course}
                  checked={selectedCourse === course}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value as CourseOption);
                    setError(false);
                  }}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-800 font-medium">{course}</span>
              </label>
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">健診コースを選択してください</p>
          )}
        </div>
        
        <div className="pt-4 flex gap-3">
          <Button variant="secondary" onClick={handleBack} fullWidth>
            戻る
          </Button>
          <Button type="submit" fullWidth>
            時間選択へ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseSelectionScreen;