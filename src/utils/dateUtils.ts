export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatDateShort = (date: Date | null): string => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date);
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const generateCalendarDays = (year: number, month: number): (number | null)[] => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  
  const days: (number | null)[] = Array(firstDay).fill(null);
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
};

export const isDateAvailable = (date: Date): boolean => {
  const day = date.getDay();
  // Assume weekends (0 = Sunday, 6 = Saturday) and past dates are not available
  if (day === 0 || day === 6) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate >= today;
};

export const getTimeSlots = (): string[] => {
  return [
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '15:30',
    '16:00',
    '16:30'
  ];
};