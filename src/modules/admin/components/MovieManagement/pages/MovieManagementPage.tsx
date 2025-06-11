import React, { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import MovieFilter from '../components/MovieFilter';
import type { Movie } from '../../../../../types/movie.type';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';

interface MovieFilterType {
  title?: string;
  isShowing?: boolean;
  genre?: string[];
}

const MovieManagementPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // Use the defined type for the filter state
  const [filter, setFilter] = useState<MovieFilterType>({});
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  const handleAddNewMovie = () => {
    setSelectedMovie(null);
    setIsFormOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedMovie(null);
  };

  const handleFormSuccess = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: message,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'swal2-dark-theme',
      },
    });
    setTriggerRefresh((prev) => prev + 1);
    handleFormClose();
  };

  const handleDeleteSuccess = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Đã xóa!',
      text: message,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'swal2-dark-theme',
      },
    });
    setTriggerRefresh((prev) => prev + 1);
  };

  const handleFilterChange = useCallback(
    (newFilter: MovieFilterType) => {
      // <--- Also type newFilter here
      // Perform a shallow comparison to see if the filter actually changed
      const currentKeys = Object.keys(filter) as (keyof MovieFilterType)[];
      const newKeys = Object.keys(newFilter) as (keyof MovieFilterType)[];

      const isFilterChanged =
        currentKeys.length !== newKeys.length ||
        newKeys.some((key) => filter[key] !== newFilter[key]);

      if (isFilterChanged) {
        setFilter(newFilter);
      }
    },
    [filter]
  );

  return (
    <>
      <div className='min-h-screen'>
        <div className='container mx-auto bg-base-100 p-8 rounded-lg shadow-xl'>
          <h1 className='text-4xl font-bold mb-8 text-primary text-center'>
            Quản Lý Phim
          </h1>

          <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
            <button
              className='btn btn-primary w-full md:w-auto'
              onClick={handleAddNewMovie}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Thêm Phim Mới
            </button>
            <MovieFilter onFilterChange={handleFilterChange} />
          </div>

          {isFormOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
              <div className='card w-full max-w-2xl bg-base-200 shadow-xl p-6 relative overflow-y-auto max-h-[90vh]'>
                <button
                  className='btn btn-sm btn-circle absolute right-4 top-4'
                  onClick={handleFormClose}
                >
                  ✕
                </button>
                <h2 className='text-2xl font-semibold mb-4 text-primary text-center'>
                  {selectedMovie ? 'Chỉnh Sửa Phim' : 'Thêm Phim Mới'}
                </h2>
                <MovieForm
                  movie={selectedMovie}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormClose}
                />
              </div>
            </div>
          )}

          <MovieList
            onEdit={handleEditMovie}
            onDeleteSuccess={handleDeleteSuccess}
            filter={filter}
            triggerRefresh={triggerRefresh}
          />
        </div>
      </div>
    </>
  );
};

export default MovieManagementPage;
