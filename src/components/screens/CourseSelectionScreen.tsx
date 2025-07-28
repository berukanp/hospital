import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';
import { CourseOption } from '../../types';
import Button from '../ui/Button';
import { Info } from 'lucide-react';

const CourseSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { reservation, updateReservation } = useReservation();
  const [selectedCourse, setSelectedCourse] = useState<CourseOption | ''>(reservation.course as CourseOption || '');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState(false);
  
  if (!reservation.date) {
    navigate('/');
    return null;
  }
  
  const courseOptions = [
    {
      name: "生活習慣病予防健診" as CourseOption,
      hasRequiredStoolTest: true,
      description: "便潜血検査が必須です"
    },
    {
      name: "定期健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "法定定期健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "雇用時健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "簡易健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "特定健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "電離放射線健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "長時間勤務健診" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    },
    {
      name: "その他" as CourseOption,
      hasRequiredStoolTest: false,
      description: ""
    }
  ];

  const optionalTests = [
    "便潜血検査",
    "胸部X線検査",
    "心電図検査",
    "血液検査"
  ];

  // Check if selected date is within 14 days from today
  const isWithin14Days = () => {
    if (!reservation.date) return false;
    const today = new Date();
    const selectedDate = new Date(reservation.date);
    const diffTime = selectedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 14;
  };

  const isStoolTestDisabled = () => {
    return isWithin14Days() && !courseOptions.find(c => c.name === selectedCourse)?.hasRequiredStoolTest;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      setError(true);
      return;
    }
    
    const selectedCourseData = courseOptions.find(c => c.name === selectedCourse);
    let finalOptions = [...selectedOptions];
    
    // Add required stool test for 生活習慣病予防健診
    if (selectedCourseData?.hasRequiredStoolTest) {
      finalOptions = [...new Set([...finalOptions, "便潜血検査"])];
    }
    
    updateReservation({ 
      course: selectedCourse,
      option: finalOptions.join(', ')
    });
    navigate('/time-selection');
  };
  
  const handleOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, option]);
    } else {
      setSelectedOptions(prev => prev.filter(opt => opt !== option));
    }
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
            {courseOptions.map((courseData) => (
              <label
                key={courseData.name}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCourse === courseData.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="course"
                  value={courseData.name}
                  checked={selectedCourse === courseData.name}
                  onChange={(e) => {
                    const newCourse = e.target.value as CourseOption;
                    setSelectedCourse(newCourse);
                    setError(false);
                    
                    // Reset options when course changes
                    setSelectedOptions([]);
                  }}
                  className="mr-3 text-blue-600"
                />
                <div className="flex-1">
                  <span className="text-gray-800 font-medium">{courseData.name}</span>
                  {courseData.hasRequiredStoolTest && (
                    <div className="text-sm text-blue-600 mt-1">
                      便潜血検査が必須です
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">健診コースを選択してください</p>
          )}
        </div>

        {selectedCourse && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              オプション検査
            </label>
            <div className="space-y-2">
              {optionalTests.map((option) => {
                const selectedCourseData = courseOptions.find(c => c.name === selectedCourse);
                const isStoolTest = option === "便潜血検査";
                const isRequired = isStoolTest && selectedCourseData?.hasRequiredStoolTest;
                const isDisabled = isStoolTest && !isRequired && isStoolTestDisabled();
                const isChecked = isRequired || selectedOptions.includes(option);
                
                return (
                  <label
                    key={option}
                    className={`flex items-center p-3 border rounded-lg transition-colors ${
                      isDisabled || isRequired
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                        : 'border-gray-300 hover:border-gray-400 cursor-pointer'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled || isRequired}
                      onChange={(e) => handleOptionChange(option, e.target.checked)}
                      className="mr-3 text-blue-600 disabled:opacity-50"
                    />
                    <span className={`flex-1 ${isDisabled || isRequired ? 'text-gray-400' : 'text-gray-800'}`}>
                      {option}
                      {isRequired && <span className="text-blue-600 ml-2">(必須)</span>}
                    </span>
                    {isDisabled && !isRequired && (
                      <div className="relative group">
                        <Info size={16} className="text-gray-400" />
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          本日から14日以上先の日付を選択してください
                        </div>
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        )}
        
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