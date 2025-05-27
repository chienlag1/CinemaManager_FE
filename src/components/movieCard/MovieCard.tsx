import React from 'react';

interface MovieCardProps {
  title: string;
  description: string;
  posterUrl: string;
  onDetailsClick?: () => void;
  onFavoriteClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  description,
  posterUrl,
  onDetailsClick,
  onFavoriteClick,
}) => {
  return (
    <div className='card w-full bg-base-100 shadow-xl'>
      <figure>
        <img src={posterUrl} alt={title} className='object-cover h-64 w-full' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='line-clamp-3'>{description}</p>
        <div className='card-actions justify-between mt-4'>
          <button className='btn btn-primary' onClick={onDetailsClick}>
            Xem chi tiết
          </button>
          <button
            className='btn btn-outline btn-secondary'
            onClick={onFavoriteClick}
          >
            ❤️ Yêu thích
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
