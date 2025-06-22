import React from 'react';
import type { RoomType } from '../../../../../types/room.type';

// Define the shape of the filters object
export interface RoomFilters {
  // Export this interface to be used in RoomManagementPage
  roomName: string;
  roomType: RoomType | ''; // Use RoomType here
  status: 'active' | 'inactive' | '';
}

// Define an interface for the RoomFilter props
interface RoomFilterProps {
  filters: RoomFilters;
  onFilterChange: (name: keyof RoomFilters, value: string) => void;
  onResetFilters: () => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className='bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Tìm theo tên rạp */}
        <div>
          <label className='block text-gray-300 text-sm font-bold mb-2'>
            Tìm theo tên rạp:
          </label>
          <input
            type='text'
            placeholder='Nhập tên rạp'
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
            value={filters.roomName}
            onChange={(e) => onFilterChange('roomName', e.target.value)}
          />
        </div>

        {/* Chọn loại rạp */}
        <div>
          <label className='block text-gray-300 text-sm font-bold mb-2'>
            Loại rạp:
          </label>
          <select
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500'
            value={filters.roomType}
            onChange={(e) => onFilterChange('roomType', e.target.value)}
          >
            <option value=''>Tất cả</option>
            <option value='2D'>2D</option>
            <option value='3D'>3D</option>
            <option value='IMAX'>IMAX</option>
            <option value='VIP'>VIP</option>
            <option value='Standard'>Standard</option>
          </select>
        </div>

        {/* Trạng thái */}
        <div>
          <label className='block text-gray-300 text-sm font-bold mb-2'>
            Trạng thái:
          </label>
          <select
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500'
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value=''>Tất cả</option>
            <option value='active'>Hoạt động</option>
            <option value='inactive'>Không hoạt động</option>
          </select>
        </div>
      </div>

      {/* Nút reset */}
      <div className='mt-6 flex justify-end'>
        <button
          onClick={onResetFilters}
          className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75'
        >
          Đặt lại bộ lọc
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
