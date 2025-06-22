import React from 'react';

interface MovieDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  posterUrl: string;
  genre: string[];
  releaseDate: string;
  duration: number;
  rating?: number;
  isShowing: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  posterUrl,
  genre,
  releaseDate,
  duration,
  rating,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-gray-900 rounded-xl w-full max-w-3xl mx-4 md:mx-0 overflow-hidden shadow-lg'>
        <div className='flex flex-col md:flex-row'>
          {/* Poster */}
          <img
            src={posterUrl}
            alt={title}
            className='w-full md:w-1/3 h-64 object-cover md:h-auto'
          />

          {/* Details */}
          <div className='p-6 flex-1 text-white'>
            <h2 className='text-2xl font-bold mb-2'>{title}</h2>
            <p className='text-sm text-gray-400 mb-3'>
              Thể loại: {genre.join(', ')}
            </p>
            <p className='text-sm text-gray-400 mb-3'>
              Khởi chiếu: {new Date(releaseDate).toLocaleDateString('vi-VN')}
            </p>
            <p className='text-sm text-gray-400 mb-3'>
              Thời lượng: {duration} phút
            </p>
            <p className='text-sm text-gray-400 mb-3'>
              Đánh giá: {rating !== undefined ? `${rating}/10` : 'Chưa có'}
            </p>
            <p className='text-sm text-gray-400 mb-3'>Mô Tả: {description}</p>

            <div className='text-right'>
              <button
                onClick={onClose}
                className='px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
