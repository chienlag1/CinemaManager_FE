import { useState, useEffect } from 'react';
import MovieListPage from '../components/MovieListPage';
import movieApiService from '../../../../services/api.movie';
import type { Movie } from '../../../../types/movie.type';
import MovieDetailModal from '../components/DetailMovieCard';
import MovieFilter from '../../../admin/components/MovieManagement/components/MovieFilter';

interface MovieFilterType {
  title?: string;
  isShowing?: boolean;
  genre?: string[];
}

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<MovieFilterType>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await movieApiService.getAllMovies();
        setMovies(response.data.movies);
      } catch (err) {
        setError('Failed to load movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = filter.title
      ? movie.title.toLowerCase().includes(filter.title.toLowerCase())
      : true;

    const matchesIsShowing =
      filter.isShowing !== undefined
        ? movie.isShowing === filter.isShowing
        : true;

    const matchesGenre =
      filter.genre && filter.genre.length > 0
        ? filter.genre.some((g) =>
            Array.isArray(movie.genre)
              ? movie.genre.includes(g)
              : movie.genre === g
          )
        : true;

    return matchesTitle && matchesIsShowing && matchesGenre;
  });

  const handleMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className='p-6'>
      <h1 className='text-4xl font-extrabold text-center  text-white drop-shadow-lg pb-6'>
        Danh Sách Phim
      </h1>

      {/* Hiển thị thông báo lỗi nếu có */}
      {/* Bộ lọc phim */}
      <MovieFilter onFilterChange={(filter) => setFilter(filter)} />

      {/* Trạng thái & danh sách phim */}
      {!loading &&
        !error &&
        (filteredMovies.length > 0 ? (
          <MovieListPage
            movies={filteredMovies}
            onDetailsClick={handleMovieDetails}
          />
        ) : (
          <p className='text-gray-400 text-center mt-6'>
            Không tìm thấy phim phù hợp .
          </p>
        ))}

      {/* Modal chi tiết */}
      {selectedMovie && (
        <MovieDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedMovie.title}
          description={selectedMovie.description}
          posterUrl={selectedMovie.posterUrl}
          genre={selectedMovie.genre}
          releaseDate={selectedMovie.releaseDate}
          duration={selectedMovie.duration}
          rating={selectedMovie.rating}
          isShowing={selectedMovie.isShowing}
          createdAt={selectedMovie.createdAt}
          updatedAt={selectedMovie.updatedAt}
        />
      )}
    </div>
  );
};

export default MoviePage;
