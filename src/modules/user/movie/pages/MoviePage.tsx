import { useState, useEffect } from 'react';
import MovieListPage from '../components/MovieListPage';
import movieApiService from '../../../../services/api.movie';
import type { Movie } from '../../../../types/movie.type';
import MovieDetailModal from '../../../../components/movieCard/DetailMovieCard';
const genres = ['All', 'action', 'science fiction'];

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
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
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === 'All' ||
      (Array.isArray(movie.genre)
        ? movie.genre.includes(selectedGenre)
        : movie.genre === selectedGenre);
    return matchesSearch && matchesGenre;
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
      {/* Search & Filter Controls */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
        <div className='form-control w-full sm:w-1/2'>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 opacity-50'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z'
              />
            </svg>
            <input
              type='text'
              className='grow'
              placeholder='Search for movies...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        <div className='flex justify-end w-full mb-6'>
          <div className='form-control w-full sm:w-1/3'>
            <select
              className='select select-bordered'
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Status & Movie List */}
      {loading && <p className='text-gray-400'>Loading movies...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && !error && (
        <MovieListPage
          movies={filteredMovies}
          onDetailsClick={handleMovieDetails}
        />
      )}

      {/* Movie Detail Modal */}
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
