/**
 * @file Thành phần này chịu trách nhiệm hiển thị danh sách suất chiếu trong một bảng.
 * Nó nhận dữ liệu suất chiếu và các hàm xử lý hành động (sửa, xóa) làm props.
 */

import React from 'react';
import type { IShowtime } from '../../../../../types/showtime.type';

interface ShowtimeTableProps {
  showtimes: IShowtime[];
  onEditShowtime: (showtime: IShowtime) => void;
  onDeleteShowtime: (id: string) => void;
  formatDateTime: (dateString: string | Date | undefined) => string; // Nhận hàm định dạng
}

const ShowtimeTable: React.FC<ShowtimeTableProps> = ({
  showtimes,
  onEditShowtime,
  onDeleteShowtime,
  formatDateTime,
}) => {
  console.log('ShowtimeTable nhận showtimes:', showtimes); // LOG ĐỂ DEBUG: Kiểm tra prop showtimes nhận được

  return (
    <div className='bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='bg-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Phim
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Phòng
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Thời gian bắt đầu
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Thời gian kết thúc
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Giá
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Trạng thái
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Số ghế trống
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className='bg-gray-800 divide-y divide-gray-700'>
            {showtimes.length > 0 ? (
              showtimes.map((showtime) => {
                // LOG ĐỂ DEBUG: Kiểm tra từng đối tượng showtime
                console.log('Đang render showtime:', showtime);
                // Đảm bảo movie và room không null/undefined trước khi truy cập thuộc tính
                const movieTitle = showtime.movie?.title || 'Không rõ phim';
                const moviePosterUrl =
                  showtime.movie?.posterUrl ||
                  'https://placehold.co/50x75/000000/FFFFFF?text=No+Image';
                const roomName = showtime.room?.name || 'Không rõ phòng';
                const roomType = showtime.room?.type || 'N/A';

                return (
                  <tr
                    key={showtime._id}
                    className='hover:bg-gray-700 transition-colors duration-200'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                      <div className='flex items-center'>
                        <img
                          src={moviePosterUrl}
                          alt={movieTitle}
                          className='w-10 h-10 rounded-md mr-3 object-cover'
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              'https://placehold.co/50x75/000000/FFFFFF?text=No+Image';
                          }}
                        />
                        {movieTitle}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {roomName} ({roomType})
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {formatDateTime(showtime.startTime)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {formatDateTime(showtime.endTime)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {showtime.price.toLocaleString('vi-VN')} VND
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          showtime.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {showtime.isActive ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {showtime.availableSeats}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <button
                        onClick={() => onEditShowtime(showtime)}
                        className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md mr-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75'
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => onDeleteShowtime(showtime._id)}
                        className='bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75'
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className='px-6 py-4 text-center text-gray-400'>
                  Không tìm thấy suất chiếu nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowtimeTable;
