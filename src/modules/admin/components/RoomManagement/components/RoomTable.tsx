import React from 'react';
import type { Room } from '../../../../../types/room.type';

interface RoomTableProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  onEdit,
  onDelete,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
        <p className='ml-4 text-white'>Đang tải dữ liệu rạp...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-error text-white'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span>Lỗi: {error.message || 'Không thể tải dữ liệu rạp.'}</span>
      </div>
    );
  }

  return (
    <div className='bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='bg-gray-700'>
            <tr>
              <th className='w-12 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                #
              </th>
              <th className='w-48 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Tên rạp
              </th>
              <th className='w-40 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Loại rạp
              </th>
              <th className='w-32 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Sức chứa
              </th>
              <th className='w-32 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Tình trạng
              </th>
              <th className='w-40 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className='bg-gray-800 divide-y divide-gray-700'>
            {rooms.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='text-center py-6 text-gray-400 text-sm'
                >
                  Không có rạp nào để hiển thị.
                </td>
              </tr>
            ) : (
              rooms.map((room, index) => (
                <tr
                  key={room._id}
                  className='hover:bg-gray-700 transition-colors duration-200'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-white'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-white'>
                    {room.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    {room.type}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    {room.capacity}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {room.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button
                      onClick={() => onEdit(room)}
                      className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md mr-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75'
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(room._id)}
                      className='bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75'
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTable;
