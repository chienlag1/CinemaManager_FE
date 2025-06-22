import React, { useState, useCallback } from 'react';
import MovieFilter from '../components/MovieFilter';
import type { Movie } from '../../../../../types/movie.type';
import MovieForm from '../components/MovieModal';
import MovieList from '../components/MovieTable';
import MovieAddButton from '../components/MovieAddButton';
import Pagination from '../../../../../components/pagination/pagination';
import { showToast } from '../../../../../utils/alertUtils';

interface MovieFilterType {
  title?: string;
  isShowing?: boolean;
  genre?: string[];
}

const MovieManagementPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filter, setFilter] = useState<MovieFilterType>({});
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

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
    showToast(message, 'success');
    setTriggerRefresh((prev) => prev + 1);
    handleFormClose();
  };

  const handleDeleteSuccess = (message: string) => {
    showToast(message, 'success', 'Đã xóa!');
    setTriggerRefresh((prev) => prev + 1);
  };

  const handleFilterChange = useCallback(
    (newFilter: MovieFilterType) => {
      const currentKeys = Object.keys(filter) as (keyof MovieFilterType)[];
      const newKeys = Object.keys(newFilter) as (keyof MovieFilterType)[];
      const isFilterChanged =
        currentKeys.length !== newKeys.length ||
        newKeys.some((key) => filter[key] !== newFilter[key]);

      if (isFilterChanged) {
        setFilter(newFilter);
        setCurrentPage(1); // Reset về trang đầu khi lọc
      }
    },
    [filter]
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-gray-100 p-8 font-inter flex flex-col items-center'>
      <div className='max-w-7xl w-full'>
        <h1 className='text-4xl font-extrabold text-center mb-10 text-white drop-shadow-lg'>
          Quản Lý Phim
        </h1>

        <MovieAddButton onClick={handleAddNewMovie} />
        <MovieFilter onFilterChange={handleFilterChange} />

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
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onTotalChange={setTotalItems}
        />

        {/* PHÂN TRANG */}
        <div className='mt-6 flex justify-center'>
          {totalItems > itemsPerPage && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieManagementPage;
