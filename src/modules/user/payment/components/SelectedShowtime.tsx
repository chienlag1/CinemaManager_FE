import { useEffect, useState } from 'react';
import type { IShowtime } from '../../../../types/showtime.type';
import { showtimeApiService } from '../../../../services/api.showtime';

const SelectShowtime = ({
  movieId,
  onSelect,
}: {
  movieId: string;
  onSelect: (s: IShowtime) => void;
}) => {
  const [showtimes, setShowtimes] = useState<IShowtime[]>([]);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>(''); // Thêm state để quản lý suất chiếu được chọn

  useEffect(() => {
    showtimeApiService
      .getAllShowtimes({ movie: movieId })
      .then((list) => {
        // Lọc các suất chiếu trong quá khứ
        const now = new Date();
        const futureShowtimes = list.filter((s) => new Date(s.startTime) > now);
        setShowtimes(futureShowtimes);
        // Nếu có suất chiếu, chọn suất chiếu đầu tiên theo mặc định hoặc không chọn gì
        if (futureShowtimes.length > 0) {
          // Bạn có thể giữ lựa chọn ban đầu trống hoặc chọn suất đầu tiên
          // setSelectedShowtimeId(futureShowtimes[0]._id);
          // onSelect(futureShowtimes[0]);
        }
      })
      .catch(console.error);
  }, [movieId]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedShowtimeId(selectedId);
    const selected = showtimes.find((s) => s._id === selectedId);
    if (selected) {
      onSelect(selected); // Gọi hàm onSelect từ props để cập nhật suất chiếu đã chọn ở component cha
    } else {
      onSelect(null as any); // Xóa suất chiếu đã chọn nếu không tìm thấy (ví dụ: chọn option "Chọn suất chiếu")
    }
  };

  return (
    <div className='mb-4'>
      <h3 className='font-semibold mb-2'>Chọn suất chiếu:</h3>
      {showtimes.length === 0 ? (
        <p className='text-gray-400'>Không có suất chiếu khả dụng</p>
      ) : (
        <select
          value={selectedShowtimeId}
          onChange={handleSelectChange}
          className='block w-full p-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500'
        >
          <option value=''>-- Chọn suất chiếu --</option>
          {showtimes.map((s) => (
            <option key={s._id} value={s._id}>
              {new Date(s.startTime).toLocaleString('vi-VN')} – {s.room.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectShowtime;
