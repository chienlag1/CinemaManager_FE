import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
  size?: number;
  colorClass?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Đang tải...',
  size = 8,
  colorClass = 'text-blue-400',
}) => {
  return (
    <div className='text-center py-8 text-blue-300'>
      <svg
        className={`animate-spin h-${size} w-${size} ${colorClass} mx-auto`}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
      <p className='mt-2 text-lg'>{message}</p>
    </div>
  );
};

export default LoadingIndicator;
