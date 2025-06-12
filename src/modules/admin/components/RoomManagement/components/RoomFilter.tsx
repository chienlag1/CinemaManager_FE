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
    <div className='mb-6 bg-base-200 p-6 rounded-box shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text text-white'>Tìm theo tên phòng:</span>
        </label>
        <input
          type='text'
          placeholder='Nhập tên phòng'
          className='input input-bordered w-full'
          value={filters.roomName}
          onChange={(e) => onFilterChange('roomName', e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label className='label'>
          <span className='label-text text-white'>Tìm theo loại phòng:</span>
        </label>
        <select
          className='select select-bordered w-full'
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

      <div className='form-control'>
        <label className='label'>
          <span className='label-text text-white'>Trạng thái:</span>
        </label>
        <select
          className='select select-bordered w-full'
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value=''>Tất cả</option>
          <option value='active'>Hoạt động</option>
          <option value='inactive'>Không hoạt động</option>
        </select>
      </div>

      <div className='flex justify-end md:justify-start'>
        <button className='btn btn-ghost' onClick={onResetFilters}>
          Đặt lại bộ lọc
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
