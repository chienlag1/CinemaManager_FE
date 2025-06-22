import React from 'react';

interface MovieCardProps {
  title: string;
  description: string;
  posterUrl: string;
  genre: string[];
  releaseDate: string;
  onDetailsClick?: () => void;
  onFavoriteClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  description,
  posterUrl,
  genre,
  releaseDate,
  onDetailsClick,
  onFavoriteClick,
}) => {
  return (
    <div className='bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden'>
      <img
        src={posterUrl}
        alt={title}
        className='w-full h-64 object-cover rounded-t-2xl'
      />

      <div className='p-5'>
        {/* Title */}
        <h2 className='text-xl font-semibold text-white mb-2'>{title}</h2>

        {/* Genre & Release */}
        <div className='text-sm text-gray-400 space-y-1 mb-3'>
          <div className='flex items-center gap-2'>
            <span className='text-gray-300'>Thể loại: {genre.join(', ')}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-300'>
              Khởi chiếu: {new Date(releaseDate).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className='text-gray-200 text-sm line-clamp-3 mb-4'>
          Mô tả: {description}
        </p>

        {/* Actions */}
        <div className='flex justify-between items-center'>
          <button
            onClick={onDetailsClick}
            className='btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 transition px-4'
          >
            Chi tiết
          </button>
          <button
            onClick={onFavoriteClick}
            className='btn btn-sm border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition px-4'
          >
            ❤️ Yêu thích
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
