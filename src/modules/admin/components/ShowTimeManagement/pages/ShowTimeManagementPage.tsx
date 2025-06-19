import React, { useState, useEffect, useCallback } from 'react';
import type {
  ICreateShowtimePayload,
  IShowtime,
  IUpdateShowtimePayload,
} from '../../../../../types/showtime.type';
import {
  createShowtime,
  deleteShowtime,
  getAllShowtimes,
  updateShowtime,
} from '../../../../../services/api.showtime';

import ShowtimeModal from '../components/ShowtimeModal';
import ShowtimeTable from '../components/ShowtimeTable';
import ShowtimeFilter from '../components/ShowTimeFilter';
import ShowtimeAddButton from '../components/ShowTimeButton';
import { showToast, confirmAndDelete } from '../../../../../utils/alertUtils';
import movieApiService from '../../../../../services/api.movie';
import { roomApiService } from '../../../../../services/api.room';
import type { Movie } from '../../../../../types/movie.type';
import type { Room } from '../../../../../types/room.type';

// Định dạng ngày giờ
const formatDateTime = (dateString: string | Date | undefined) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const ShowtimeManagementPage: React.FC = () => {
  const [showtimes, setShowtimes] = useState<IShowtime[]>([]);
  const [filterMovie, setFilterMovie] = useState('');
  const [filterRoom, setFilterRoom] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<IShowtime | null>(
    null
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoviesAndRooms = async () => {
      try {
        const [movieRes, roomRes] = await Promise.all([
          movieApiService.getAllMovies(),
          roomApiService.getAllRooms(),
        ]);
        setMovies(movieRes.data.movies);
        setRooms(roomRes.data.rooms);
      } catch (err) {
        console.error('Lỗi khi tải phim hoặc phòng:', err);
      }
    };

    fetchMoviesAndRooms();
  }, []);

  const fetchShowtimes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const showtimesData = await getAllShowtimes({
        movie: filterMovie,
        room: filterRoom,
        date: filterDate,
      });
      setShowtimes(showtimesData);
    } catch (err: any) {
      const errMsg = err.message || 'Không thể tải suất chiếu.';
      showToast(errMsg, 'error');
      setError(errMsg);
      setShowtimes([]);
    } finally {
      setIsLoading(false);
    }
  }, [filterMovie, filterRoom, filterDate]);

  useEffect(() => {
    fetchShowtimes();
  }, [fetchShowtimes]);

  const handleSetFilterMovie = (value: string) => setFilterMovie(value);
  const handleSetFilterRoom = (value: string) => setFilterRoom(value);
  const handleSetFilterDate = (value: string) => setFilterDate(value);
  const handleResetFilters = () => {
    setFilterMovie('');
    setFilterRoom('');
    setFilterDate('');
  };

  const handleAddNewShowtime = () => {
    setEditingShowtime(null);
    setIsModalOpen(true);
  };

  const handleEditShowtime = (showtime: IShowtime) => {
    setEditingShowtime(showtime);
    setIsModalOpen(true);
  };

  const handleSubmitShowtime = async (
    formData: ICreateShowtimePayload & { isActive?: boolean }
  ) => {
    try {
      if (editingShowtime) {
        const updatePayload: IUpdateShowtimePayload = {
          movie: formData.movie,
          room: formData.room,
          startTime: formData.startTime,
          price: formData.price,
          isActive: formData.isActive,
        };
        await updateShowtime(editingShowtime._id, updatePayload);
        showToast('Cập nhật suất chiếu thành công!', 'success');
      } else {
        const createPayload: ICreateShowtimePayload = {
          movie: formData.movie,
          room: formData.room,
          startTime: formData.startTime,
          price: formData.price,
        };
        await createShowtime(createPayload);
        showToast('Tạo suất chiếu thành công!', 'success');
        handleResetFilters();
      }

      setIsModalOpen(false);
      setEditingShowtime(null);
      fetchShowtimes();
    } catch (err: any) {
      const errMsg = err.message || 'Không thể lưu suất chiếu.';
      showToast(errMsg, 'error');
      setError(errMsg);
    }
  };

  const handleDeleteShowtime = async (id: string) => {
    await confirmAndDelete(
      async () => {
        await deleteShowtime(id);
      },
      (message) => {
        showToast(message, 'success', 'Đã xoá!');
        fetchShowtimes();
      },
      (errMessage) => {
        showToast(errMessage, 'error');
      },
      {
        title: 'Bạn có chắc chắn muốn xóa suất chiếu này?',
        confirmText: 'Xoá',
        cancelText: 'Huỷ',
        successMessage: 'Xoá suất chiếu thành công!',
      }
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-gray-100 p-8 font-inter flex flex-col items-center'>
      <div className='max-w-7xl w-full'>
        <h1 className='text-4xl font-extrabold text-center mb-10 text-white drop-shadow-lg'>
          Quản Lý Suất Chiếu
        </h1>

        <ShowtimeAddButton onClick={handleAddNewShowtime} />
        <ShowtimeFilter
          filterMovie={filterMovie}
          setFilterMovie={handleSetFilterMovie}
          filterRoom={filterRoom}
          setFilterRoom={handleSetFilterRoom}
          filterDate={filterDate}
          setFilterDate={handleSetFilterDate}
          onResetFilters={handleResetFilters}
        />

        {isLoading && (
          <div className='text-center py-8 text-blue-300'>
            <svg
              className='animate-spin h-8 w-8 text-blue-400 mx-auto'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            <p className='mt-2 text-lg'>Đang tải suất chiếu...</p>
          </div>
        )}

        {!isLoading && !error && (
          <ShowtimeTable
            showtimes={showtimes}
            onEditShowtime={handleEditShowtime}
            onDeleteShowtime={handleDeleteShowtime}
            formatDateTime={formatDateTime}
          />
        )}
      </div>

      {isModalOpen && (
        <ShowtimeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingShowtime={editingShowtime}
          onSubmit={handleSubmitShowtime}
          movies={movies}
          rooms={rooms}
        />
      )}
    </div>
  );
};

export default ShowtimeManagementPage;
