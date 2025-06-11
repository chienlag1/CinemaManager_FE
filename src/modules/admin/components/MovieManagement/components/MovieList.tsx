import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import type { Movie } from '../../../../../types/movie.type';
import movieApiService from '../../../../../services/api.movie';
import LoadingSpinner from '../../../../../components/loading/LoadingSpinner';
import Pagination from '../../../../../components/pagination/pagination';

interface MovieListProps {
  onEdit: (movie: Movie) => void;
  onDeleteSuccess: (message: string) => void;
  filter: any;
  triggerRefresh: number;
}

const shortenDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const MovieList: React.FC<MovieListProps> = ({
  onEdit,
  onDeleteSuccess, // Destructure prop onDeleteSuccess
  filter,
  triggerRefresh,
}) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]); // Lưu trữ TẤT CẢ phim
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // Phim đã lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); // Vẫn dùng cho phân trang trên dữ liệu đã lọc
  const [totalFilteredMovies, setTotalFilteredMovies] = useState(0); // Tổng số phim SAU KHI lọc

  // Effect để tải TẤT CẢ phim từ API một lần (hoặc khi refresh)
  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await movieApiService.getAllMovies({});
        setAllMovies(response.data.movies); // Lưu tất cả phim
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Failed to fetch movies.';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: errorMessage,
          customClass: {
            popup: 'swal2-dark-theme',
          },
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

    // Lọc theo trạng thái đang chiếu (isShowing)
    if (typeof filter.isShowing === 'boolean') {
      currentFiltered = currentFiltered.filter(
        (movie) => movie.isShowing === filter.isShowing
      );
    }

    // Lọc theo thể loại (genre)
    if (filter.genre && filter.genre.length > 0) {
      currentFiltered = currentFiltered.filter((movie) =>
        // Kiểm tra xem phim có bất kỳ thể loại nào được chọn không
        filter.genre?.some(
          (
            selectedGenre: string // Khắc phục lỗi TypeScript ở đây
          ) => movie.genre.includes(selectedGenre)
        )
      );
    }

    setFilteredMovies(currentFiltered);
    setTotalFilteredMovies(currentFiltered.length);
    setCurrentPage(1); // Reset trang về 1 mỗi khi bộ lọc thay đổi
  }, [allMovies, filter]); // Phụ thuộc vào allMovies và filter

  // Logic phân trang trên dữ liệu đã lọc
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'swal2-dark-theme',
      },
    }).then(async (result: SweetAlertResult) => {
      // Sử dụng SweetAlertResult
      if (result.isConfirmed) {
        try {
          await movieApiService.deleteMovie(id);
          onDeleteSuccess('Phim đã được xóa thành công!'); // Sử dụng prop onDeleteSuccess
        } catch (err: any) {
          Swal.fire({
            title: 'Lỗi!',
            text: err.response?.data?.message || 'Không thể xóa phim.',
            icon: 'error',
            customClass: {
              popup: 'swal2-dark-theme',
            },
          });
        }
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className='text-center text-error p-4'>{error}</div>;
  if (filteredMovies.length === 0 && !loading)
    // Kiểm tra filteredMovies
    return (
      <div className='text-center p-4'>Không có phim nào được tìm thấy.</div>
    );

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Ngày phát hành</th>
            <th>Thời lượng (phút)</th>
            <th>Thể loại</th>
            <th>Đang chiếu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentMovies.map(
            (
              movie // Render currentMovies (đã phân trang)
            ) => (
              <tr key={movie._id}>
                <td>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/48x48/CCCCCC/FFFFFF?text=No+Image`;
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td>{movie.title}</td>
                <td className='w-1/4'>
                  {shortenDescription(movie.description, 100)}
                </td>
                <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                <td>{movie.duration}</td>
                <td>{movie.genre.join(', ')}</td>
                <td>
                  <input
                    type='checkbox'
                    className='toggle toggle-primary'
                    checked={movie.isShowing}
                    readOnly
                  />
                </td>
                <td className='flex space-x-2'>
                  <button
                    className='btn btn-sm btn-info'
                    onClick={() => onEdit(movie)}
                  >
                    Sửa
                  </button>
                  <button
                    className='btn btn-sm btn-error'
                    onClick={() => handleDelete(movie._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className='mt-4 flex justify-center'>
        {totalFilteredMovies > 0 && (
          <Pagination
            totalItems={totalFilteredMovies}
            itemsPerPage={moviesPerPage}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
