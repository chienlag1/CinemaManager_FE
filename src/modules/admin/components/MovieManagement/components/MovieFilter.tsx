import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface MovieFilterProps {
  onFilterChange: (filter: {
    title?: string;
    isShowing?: boolean;
    genre?: string[];
  }) => void;
}

const movieGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Drama',
  'Documentary',
  'Family',
  'Horror',
  'Martial Arts',
  'Musical',
  'Mythology',
  'Romance',
  'Science Fiction',
  'Sports',
  'Suspense',
  'Thriller',
  'War',
];

const genreOptions = movieGenres.map((g) => ({
  value: g,
  label: g,
}));

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [isShowing, setIsShowing] = useState<string>('');
  const [genre, setGenre] = useState<string[]>([]);

  useEffect(() => {
    const filter: { title?: string; isShowing?: boolean; genre?: string[] } =
      {};
    if (title) filter.title = title;
    if (isShowing !== '') filter.isShowing = isShowing === 'true';
    if (genre.length > 0) filter.genre = genre;
    onFilterChange(filter);
  }, [title, isShowing, genre, onFilterChange]);

  const handleReset = () => {
    setTitle('');
    setIsShowing('');
    setGenre([]);
  };

  return (
    <div className='bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Tìm theo tiêu đề */}
        <div>
          <label className='block text-gray-300 text-sm font-bold mb-2'>
            Tìm theo tiêu đề:
          </label>
          <input
            type='text'
            placeholder='Nhập tiêu đề phim'
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Chọn thể loại */}
        <div>
          <label className='block text-gray-300 text-sm font-bold mb-2'>
            Thể loại:
          </label>
          <Select
            isMulti
            options={genreOptions}
            value={genreOptions.filter((option) =>
              genre.includes(option.value)
            )}
            onChange={(selected) =>
              setGenre(selected ? selected.map((s) => s.value) : [])
            }
            className='text-black'
            classNamePrefix='react-select'
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: '#374151',
                borderColor: '#4B5563',
                color: 'white',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#374151',
                color: 'white',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#6B7280',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: 'white',
              }),
              singleValue: (base) => ({
                ...base,
                color: 'white',
              }),
            }}
          />
        </div>

        {/* Trạng thái chiếu */}
        <div>
          <label className='block text-gray-300 text-sm font-bold mb-2'>
            Trạng thái:
          </label>
          <select
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500'
            value={isShowing}
            onChange={(e) => setIsShowing(e.target.value)}
          >
            <option value=''>Tất cả</option>
            <option value='true'>Đang chiếu</option>
            <option value='false'>Sắp chiếu</option>
          </select>
        </div>
      </div>

      {/* Nút reset */}
      <div className='mt-6 flex justify-end'>
        <button
          onClick={handleReset}
          className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75'
        >
          Đặt lại bộ lọc
        </button>
      </div>
    </div>
  );
};

export default MovieFilter;
