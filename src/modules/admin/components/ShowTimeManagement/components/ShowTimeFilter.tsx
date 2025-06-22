/**
 * @file Thành phần này xử lý các trường nhập và logic cho việc lọc suất chiếu.
 */

import React from 'react';

interface ShowtimeFilterProps {
  filterMovie: string;
  setFilterMovie: (value: string) => void;
  filterRoom: string;
  setFilterRoom: (value: string) => void;
  filterDate: string;
  setFilterDate: (value: string) => void;
  onResetFilters: () => void;
}

const ShowtimeFilter: React.FC<ShowtimeFilterProps> = ({
  filterMovie,
  setFilterMovie,
  filterRoom,
  setFilterRoom,
  filterDate,
  setFilterDate,
  onResetFilters,
}) => {
  return (
    <div className='bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div>
          <label
            htmlFor='movieSearch'
            className='block text-gray-300 text-sm font-bold mb-2'
          >
            Tìm theo phim:
          </label>
          <input
            type='text'
            id='movieSearch'
            placeholder='Nhập tên phim'
            value={filterMovie}
            onChange={(e) => setFilterMovie(e.target.value)}
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label
            htmlFor='roomSearch'
            className='block text-gray-300 text-sm font-bold mb-2'
          >
            Tìm theo phòng:
          </label>
          <input
            type='text'
            id='roomSearch'
            placeholder='Nhập tên phòng'
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label
            htmlFor='dateFilter'
            className='block text-gray-300 text-sm font-bold mb-2'
          >
            Tìm theo ngày:
          </label>
          <input
            type='date'
            id='dateFilter'
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>
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

export default ShowtimeFilter;
