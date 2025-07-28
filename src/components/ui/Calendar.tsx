import React, { useState } from 'react';
import { generateCalendarDays, isDateAvailable } from '../../utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const days = generateCalendarDays(year, month);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (isDateAvailable(selectedDate)) {
      onDateSelect(selectedDate);
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={20} />
          <span>前月</span>
        </button>
        
        <h2 className="text-xl font-bold">
          {year}年 {month + 1}月
        </h2>
        
        <button 
          onClick={handleNextMonth}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <span>翌月</span>
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day, index) => (
          <div 
            key={index} 
            className={`text-center py-2 font-semibold ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="p-3"></div>;
          }
          
          const date = new Date(year, month, day);
          const isToday = new Date().toDateString() === date.toDateString();
          
          const dayStyles = [
            'flex items-center justify-center h-10 w-full rounded-md transition-colors',
            date.getDay() === 0 ? 'text-red-500' : '',
            date.getDay() === 6 ? 'text-blue-500' : '',
            isToday ? 'ring-2 ring-blue-500' : '',
            'cursor-pointer hover:bg-blue-100'
          ].filter(Boolean).join(' ');
          
          return (
            <div key={`day-${day}`} className="text-center">
              <button
                className={dayStyles}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;