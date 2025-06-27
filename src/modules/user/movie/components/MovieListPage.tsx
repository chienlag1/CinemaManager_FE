// movie/components/MovieListPage.tsx
import React from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../../../../types/movie.type';

interface MovieListPageProps {
  movies: Movie[];
  onDetailsClick: (movie: Movie) => void;
}

const MovieListPage: React.FC<MovieListPageProps> = ({
  movies,
  onDetailsClick,
}) => (
  <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
    {movies.map((movie) => (
      <MovieCard
        key={movie._id}
        movie={movie}
        onDetailsClick={() => onDetailsClick(movie)}
      />
    ))}
  </div>
);

export default MovieListPage;
