import React from 'react';

interface AddRoomButtonProps {
  onAddClick: () => void;
}

const AddRoomButton: React.FC<AddRoomButtonProps> = ({ onAddClick }) => {
  return (
    <div className='mb-6 flex justify-start'>
      <button className='btn btn-primary' onClick={onAddClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-2'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
            clipRule='evenodd'
          />
        </svg>
        Thêm Phòng Mới
      </button>
    </div>
  );
};

export default AddRoomButton;
