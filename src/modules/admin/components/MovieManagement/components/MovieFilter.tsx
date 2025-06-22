import React, { useEffect, useState, useRef } from 'react';
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
  'Fantasy',
  'Horror',
  'Romance',
  'Science Fiction',
  'Thriller',
];

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [isShowing, setIsShowing] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const prevFilter = useRef<string>('');

  // Mapping genres to react-select options
  const genreOptions = movieGenres.map((g) => ({
    label: g,
    value: g,
  }));

  useEffect(() => {
    const filter: {
      title?: string;
      isShowing?: boolean;
      genre?: string[];
    } = {};

    if (title.trim() !== '') filter.title = title;
    if (isShowing !== '') filter.isShowing = isShowing === 'true';
    if (genre.length > 0) filter.genre = genre;

    const newFilter = JSON.stringify(filter);
    if (newFilter !== prevFilter.current) {
      prevFilter.current = newFilter;
      onFilterChange(filter);
    }
  }, [title, isShowing, genre, onFilterChange]);

  return (
    <div className='bg-gray-800 p-4 rounded-lg mb-6 text-white'>
      <div className='flex flex-col md:flex-row gap-4'>
        {/* Input tên phim */}
        <div className='flex-1'>
          <input
            type='text'
            placeholder='Tìm theo tên phim...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 rounded bg-gray-700 text-white outline-none'
          />
        </div>

        {/* Select trạng thái */}
        <div className='flex-1'>
          <select
            value={isShowing}
            onChange={(e) => setIsShowing(e.target.value)}
            className='w-full px-3 py-2 rounded bg-gray-700 text-white outline-none'
          >
            <option value=''>Tất cả trạng thái</option>
            <option value='true'>Đang chiếu</option>
            <option value='false'>Ngừng chiếu</option>
          </select>
        </div>

        {/* Dropdown thể loại */}
        <div className='flex-1'>
          <Select
            isMulti
            options={genreOptions}
            value={genre.map((g) => ({ label: g, value: g }))}
            onChange={(selected) => setGenre(selected.map((s) => s.value))}
            placeholder='Chọn thể loại...'
            className='text-sm'
            classNamePrefix='react-select'
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: '#374151',
                borderColor: state.isFocused ? '#3b82f6' : '#4b5563',
                borderRadius: '0.375rem',
                padding: '2px',
                color: 'white',
                boxShadow: 'none',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#374151',
                color: 'white',
                zIndex: 50,
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#4B5563',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: 'white',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: 'white',
                ':hover': {
                  backgroundColor: '#EF4444',
                  color: 'white',
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: '#9ca3af',
              }),
              input: (base) => ({
                ...base,
                color: 'white',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
