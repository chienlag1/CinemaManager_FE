import React, { useState } from 'react';

import Swal from 'sweetalert2';

import MovieList from './MovieList';
import MovieFilter from './MovieFilter';
import MovieForm from './MovieForm';
// Đảm bảo đường dẫn này khớp với cấu trúc project của bạn.
// Nếu bạn đang sử dụng AdminLayout như chúng ta đã thảo luận, thì đường dẫn có thể khác.
// Ví dụ: import AdminLayout from '../layout/AdminLayout'; // Nếu AdminLayout nằm trong modules/admin/layout
import type { Movie } from '../../../../types/movie.type';

// Đã thêm MovieApiResponse vào import type

const MovieManagementPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filter, setFilter] = useState({});
  const [refreshList, setRefreshList] = useState(0);

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
        popup: 'swal2-dark-theme', // Apply dark theme to SweetAlert2 popup
      },
    });
    setRefreshList((prev) => prev + 1);
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
    setRefreshList((prev) => prev + 1);
  };

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
    setRefreshList((prev) => prev + 1);
  };

  return (
    <>
      <div className='min-h-screen p-8'>
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
            key={refreshList}
            onEdit={handleEditMovie}
            onDeleteSuccess={handleDeleteSuccess}
            filter={filter}
          />
        </div>
      </div>
    </>
  );
};

export default MovieManagementPage;
