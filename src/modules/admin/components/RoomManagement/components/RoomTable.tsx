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
        <p className='ml-4 text-white'>Đang tải dữ liệu phòng...</p>
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
        <span>Lỗi: {error.message || 'Không thể tải dữ liệu phòng.'}</span>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra w-full text-white'>
        <thead>
          <tr>
            <th></th>
            <th>Tên Phòng</th>
            <th>Loại Phòng</th>
            <th>Sức chứa</th>
            <th>Tình trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan={6} className='text-center py-4'>
                Không có phòng nào để hiển thị.
              </td>
            </tr>
          ) : (
            rooms.map((room, index) => (
              // Render các hàng

              <tr key={room._id}>
                <th>{index + 1}</th>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.capacity}</td>
                <td>
                  <input
                    type='checkbox'
                    className='toggle toggle-primary'
                    checked={room.isActive}
                    disabled
                  />
                </td>
                <td className='flex space-x-2'>
                  <button
                    className='btn btn-sm btn-info'
                    onClick={() => onEdit(room)}
                  >
                    Sửa
                  </button>
                  <button
                    className='btn btn-sm btn-error'
                    onClick={() => onDelete(room._id)}
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
  );
};

export default RoomTable;
