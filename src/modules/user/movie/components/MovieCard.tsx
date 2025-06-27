// src/components/MovieCard.tsx (or wherever your booking button is)
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import type { Movie } from '../../../../types/movie.type'; // Adjust path if necessary

interface MovieCardProps {
  movie: Movie;
  onDetailsClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDetailsClick }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBookTicketClick = () => {
    navigate(`/booking/${movie._id}`);
  };

  return (
    <div className='bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden'>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className='w-full h-64 object-cover rounded-t-2xl'
      />

      <div className='p-5'>
        <h2 className='text-xl font-semibold text-white mb-2'>{movie.title}</h2>

        <div className='text-sm text-gray-400 space-y-1 mb-3'>
          <div>
            <span className='text-gray-300'>
              Thể loại: {movie.genre.join(', ')}
            </span>
          </div>
          <div>
            <span className='text-gray-300'>
              Khởi chiếu:{' '}
              {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        <p className='text-gray-200 text-sm line-clamp-3 mb-4'>
          Mô tả: {movie.description}
        </p>

        <div className='flex justify-between items-center'>
          <button
            onClick={onDetailsClick}
            className='btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 transition px-4'
          >
            Chi tiết
          </button>
          <button
            onClick={handleBookTicketClick} // Attach the navigation function here
            className='btn btn-sm border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition px-4'
          >
            🎟️ Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
