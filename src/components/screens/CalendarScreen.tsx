import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../ui/Calendar';
import Modal from '../ui/Modal';
import { useReservation } from '../../context/ReservationContext';
import { formatDate } from '../../utils/dateUtils';

const CalendarScreen: React.FC = () => {
  const navigate = useNavigate();
  const { updateReservation } = useReservation();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (selectedDate) {
      updateReservation({ date: selectedDate });
      setShowModal(false);
      navigate('/course-selection');
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setSelectedDate(null);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">予約日を選択してください</h1>
      <Calendar onDateSelect={handleDateSelect} />
      
      <Modal
        isOpen={showModal}
        onClose={handleModalCancel}
        title="健康診断のオンライン予約について"
      >
        <div className="space-y-4 text-sm leading-relaxed">
          <p>こちらのページからオンラインでご予約いただけます。</p>
          <p>ご予約の前に、以下の内容をご確認ください。</p>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-bold text-gray-800 mb-2">【ご予約後の流れ】</h3>
            <div className="space-y-2">
              <p>ご予約が完了しましたら、以下のメールアドレスより確認メールをお送りいたします。</p>
              <p className="font-medium">イー健診センター予約専用メールアドレス：kenshin@goleeclinic.com</p>
              <p>確認メールをご確認のうえ、必ずご返信ください。</p>
              <p>ご返信をいただいた後、72時間以内に担当者よりご連絡いたします。</p>
              <p className="text-red-600">※ご返信がない場合は、健診日の2日前をもって自動的にキャンセルとさせていただきますのでご了承ください。</p>
              <p>確認メールが届かない場合は、恐れ入りますが上記のメールアドレスまでご連絡をお願いいたします。</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-bold text-gray-800 mb-2">【生活習慣病予防健診をお申し込みの方へ】</h3>
            <div className="space-y-2">
              <p>本コースには便潜血検査が含まれます。</p>
              <p>検査に必要な容器（検査キット）はご自宅へ郵送いたしますので、ご住所のご確認をお願いいたします。</p>
              <p>便潜血検査は、健診の1週間前から2日分の便を採取していただく必要があります。</p>
              <p>そのため、健診日の2週間前までにご予約をお済ませください。</p>
              <p className="text-blue-600">※直前のご予約の場合は、キットを当院で直接お受け取りいただくことも可能です。</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p>ご不明点がございましたら、お気軽にお問い合わせください。</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleModalCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleModalConfirm}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarScreen;