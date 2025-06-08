import React, { useEffect, useState } from 'react';
// KHÔNG cần import api và MovieApiResponse từ types nữa
// import api from '../../../../services/api.axios';
// import type { MovieApiResponse } from '../../../../types/movie.type';

import movieApiService from '../../../../services/api.movie'; // Import movieApiService
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';

import LoadingSpinner from '../../../../components/loading/LoadingSpinner';
import type { Movie } from '../../../../types/movie.type'; // Chỉ cần Movie type
import Pagination from '../../../../components/pagination/pagination';

interface MovieListProps {
  onEdit: (movie: Movie) => void;
  onDeleteSuccess: (message: string) => void;
  filter: any; // Bộ lọc từ MovieManagementPage
}

// Hàm tiện ích để rút gọn mô tả
const shortenDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const MovieList: React.FC<MovieListProps> = ({
  onEdit,
  onDeleteSuccess,
  filter,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); // Số lượng phim trên mỗi trang
  const [totalMovies, setTotalMovies] = useState(0); // Tổng số lượng phim cho phân trang

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // SỬ DỤNG movieApiService.getAllMovies
        const response = await movieApiService.getAllMovies({
          page: currentPage,
          limit: moviesPerPage,
          ...filter,
        });
        setMovies(response.data.movies); // movieApiService trả về response.data trực tiếp
        setTotalMovies(response.results); // results cũng ở root của response
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

    fetchMovies();
  }, [currentPage, moviesPerPage, filter]); // Dependency array bao gồm filter và pagination

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'swal2-dark-theme',
      },
    }).then(async (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        try {
          // SỬ DỤNG movieApiService.deleteMovie
          await movieApiService.deleteMovie(id);
          onDeleteSuccess('Phim đã được xóa thành công!');
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
  if (movies.length === 0 && !loading)
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
          {movies.map((movie) => (
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
          ))}
        </tbody>
      </table>
      <div className='mt-4 flex justify-center'>
        {totalMovies > 0 && (
          <Pagination
            totalItems={totalMovies}
            itemsPerPage={moviesPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
