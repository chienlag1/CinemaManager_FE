/**
 * @file Thành phần này hiển thị một modal cho việc thêm mới hoặc chỉnh sửa thông tin suất chiếu.
 * Nó chứa một biểu mẫu để người dùng nhập thông tin và gửi đi.
 */

import React, { useState, useEffect } from 'react';
import type {
  ICreateShowtimePayload,
  IShowtime,
} from '../../../../../types/showtime.type';

interface ShowtimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingShowtime: IShowtime | null;
  onSubmit: (formData: ICreateShowtimePayload & { isActive?: boolean }) => void;
  movies: { _id: string; title: string }[];
  rooms: { _id: string; name: string }[];
}

const ShowtimeModal: React.FC<ShowtimeModalProps> = ({
  isOpen,
  onClose,
  editingShowtime,
  onSubmit,
  movies,
  rooms,
}) => {
  const [movie, setMovie] = useState('');
  const [room, setRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (editingShowtime) {
      setMovie(editingShowtime.movie._id);
      setRoom(editingShowtime.room._id);
      setStartTime(
        new Date(editingShowtime.startTime).toISOString().slice(0, 16)
      );
      setPrice(Number(editingShowtime.price) || 0);
      setIsActive(editingShowtime.isActive);
    } else {
      setMovie('');
      setRoom('');
      setStartTime('');
      setPrice(0);
      setIsActive(true);
    }
  }, [editingShowtime]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ movie, room, startTime, price, isActive });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-white mb-6'>
          {editingShowtime ? 'Sửa Suất Chiếu' : 'Thêm Suất Chiếu Mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='movie'
              className='block text-gray-300 text-sm font-bold mb-2'
            >
              Chọn Phim:
            </label>
            <select
              id='movie'
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white border border-gray-600'
              required
            >
              <option value='' disabled>
                -- Chọn phim --
              </option>
              {movies.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='room'
              className='block text-gray-300 text-sm font-bold mb-2'
            >
              Chọn Phòng:
            </label>
            <select
              id='room'
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white border border-gray-600'
              required
            >
              <option value='' disabled>
                -- Chọn phòng --
              </option>
              {rooms.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='startTime'
              className='block text-gray-300 text-sm font-bold mb-2'
            >
              Thời gian bắt đầu:
            </label>
            <input
              type='datetime-local'
              id='startTime'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white border border-gray-600'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='price'
              className='block text-gray-300 text-sm font-bold mb-2'
            >
              Giá vé:
            </label>
            <input
              type='number'
              id='price'
              value={price}
              onChange={(e) =>
                setPrice(isNaN(+e.target.value) ? 0 : +e.target.value)
              }
              className='w-full p-2 rounded bg-gray-700 text-white border border-gray-600'
              required
            />
          </div>

          <div className='mb-4 flex items-center'>
            <label
              htmlFor='isActive'
              className='text-gray-300 text-sm font-bold mr-4'
            >
              Hoạt động:
            </label>
            <input
              type='checkbox'
              id='isActive'
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
          </div>

          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
            >
              {editingShowtime ? 'Cập Nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowtimeModal;
