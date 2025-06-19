// src/pages/admin/showtime/components/ShowtimeAddButton.tsx

import React from 'react';

interface ShowtimeAddButtonProps {
  onClick: () => void;
}

const ShowtimeAddButton: React.FC<ShowtimeAddButtonProps> = ({ onClick }) => {
  return (
    <div className='mb-8 flex justify-start'>
      <button
        onClick={onClick}
        className='flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75'
      >
        <svg
          className='w-5 h-5 mr-2 -ml-1'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          ></path>
        </svg>
        Thêm Suất Chiếu Mới
      </button>
    </div>
  );
};

export default ShowtimeAddButton;
