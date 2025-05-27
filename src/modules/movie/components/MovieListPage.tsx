// movie/components/MovieListPage.tsx
import React from 'react';
import MovieCard from '../../../components/movieCard/MovieCard';

interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
}

interface MovieListPageProps {
  movies: Movie[];
}

const MovieListPage: React.FC<MovieListPageProps> = ({ movies }) => {
  return (
    <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          description={movie.description}
          posterUrl={movie.posterUrl}
          onDetailsClick={() => alert(`Chi tiết phim: ${movie.title}`)}
          onFavoriteClick={() => alert(`Thêm vào yêu thích: ${movie.title}`)}
        />
      ))}
    </div>
  );
};

export default MovieListPage;
