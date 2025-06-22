import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import type { Movie } from '../../../../../types/movie.type';
import movieApiService from '../../../../../services/api.movie';
import LoadingSpinner from '../../../../../components/loading/LoadingSpinner';
import { confirmAndDelete, showToast } from '../../../../../utils/alertUtils';

interface MovieListProps {
  onEdit: (movie: Movie) => void;
  onDeleteSuccess: (message: string) => void;
  filter: any;
  triggerRefresh: number;
  currentPage: number;
  itemsPerPage: number;
  onTotalChange: (total: number) => void;
}

const shortenDescription = (text: string, maxLength: number) => {
  return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
};

const MovieList: React.FC<MovieListProps> = ({
  onEdit,
  onDeleteSuccess,
  filter,
  triggerRefresh,
  currentPage,
  itemsPerPage,
  onTotalChange,
}) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await movieApiService.getAllMovies({});
        setAllMovies(response.data.movies);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Failed to fetch movies.';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: errorMessage,
          customClass: { popup: 'swal2-dark-theme' },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [triggerRefresh]);

  useEffect(() => {
    let currentFiltered = allMovies;

    if (filter.title) {
      const searchTerm = filter.title.toLowerCase();
      currentFiltered = currentFiltered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }

    if (typeof filter.isShowing === 'boolean') {
      currentFiltered = currentFiltered.filter(
        (movie) => movie.isShowing === filter.isShowing
      );
    }

    if (filter.genre && filter.genre.length > 0) {
      currentFiltered = currentFiltered.filter((movie) =>
        filter.genre.some((g: string) => movie.genre.includes(g))
      );
    }

    setFilteredMovies(currentFiltered);
    onTotalChange(currentFiltered.length); // Báo lại tổng số
  }, [allMovies, filter, onTotalChange]);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handleDelete = (id: string) => {
    confirmAndDelete(
      async () => {
        await movieApiService.deleteMovie(id);
      },
      (message) => {
        showToast(message, 'success');
        onDeleteSuccess(message);
      }
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className='text-center text-error p-4'>{error}</div>;
  if (filteredMovies.length === 0 && !loading)
    return (
      <div className='text-center p-4'>Không có phim nào được tìm thấy.</div>
    );

  return (
    <div className='bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='bg-gray-700'>
            <tr>
              <th className='w-24 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Poster
              </th>
              <th className='w-40 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Tiêu đề
              </th>
              <th className='w-80 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Mô tả
              </th>
              <th className='w-32 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Ngày phát hành
              </th>
              <th className='w-32 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Thời lượng
              </th>
              <th className='w-32 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Thể loại
              </th>
              <th className='w-28 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Đang chiếu
              </th>
              <th className='w-28 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className='bg-gray-800 divide-y divide-gray-700'>
            {currentMovies.map((movie) => (
              <tr
                key={movie._id}
                className='hover:bg-gray-700 transition-colors duration-200'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm text-white'>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className='w-10 h-10 rounded-md object-cover'
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://placehold.co/48x48/CCCCCC/FFFFFF?text=No+Image';
                    }}
                  />
                </td>
                <td className='px-6 py-4 text-sm text-white'>{movie.title}</td>
                <td className='px-6 py-4 text-sm text-gray-300 w-1/4'>
                  {shortenDescription(movie.description, 100)}
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  {movie.duration}
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  {movie.genre.join(', ')}
                </td>
                <td className='px-6 py-4 text-sm'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      movie.isShowing
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {movie.isShowing ? 'Đang chiếu' : 'Không chiếu'}
                  </span>
                </td>
                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => onEdit(movie)}
                      className='h-9 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md transition duration-200'
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className='h-9 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md transition duration-200'
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieList;
