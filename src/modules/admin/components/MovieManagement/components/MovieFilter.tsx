// MovieFilter.tsx
import React, { useState, useEffect } from 'react';

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

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [isShowing, setIsShowing] = useState<string>('');
  const [genre, setGenre] = useState<string[]>([]); // Thay đổi thành string[]

  useEffect(() => {
    const filter: { title?: string; isShowing?: boolean; genre?: string[] } =
      {};
    if (title) {
      filter.title = title;
    }

    if (isShowing !== '') {
      filter.isShowing = isShowing === 'true';
    }

    if (genre.length > 0) {
      // Kiểm tra xem mảng có phần tử không
      filter.genre = genre;
    }
    onFilterChange(filter);
  }, [title, isShowing, genre, onFilterChange]);

  const handleReset = () => {
    setTitle('');
    setIsShowing('');
    setGenre([]); // Đặt lại thành mảng rỗng
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setGenre(selectedOptions);
  };

  return (
    <div className='flex flex-wrap items-center gap-4 bg-base-200 p-4 rounded-lg shadow-md'>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Tìm theo tiêu đề:</span>
        </label>
        <input
          type='text'
          placeholder='Nhập tiêu đề phim'
          className='input input-bordered'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Tìm theo thể loại:</span>
        </label>
        {/* Đây là vị trí của thanh select, nằm ngay dưới label */}
        <select
          className='select select-bordered'
          value={genre}
          onChange={handleGenreChange}
          size={movieGenres.length > 5 ? 5 : movieGenres.length}
        >
          {movieGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Trạng thái:</span>
        </label>
        <select
          className='select select-bordered'
          value={isShowing}
          onChange={(e) => setIsShowing(e.target.value)}
        >
          <option value=''>Tất cả</option>
          <option value='true'>Đang chiếu</option>
          <option value='false'>Sắp chiếu</option>
        </select>
      </div>

      <div className='form-control mt-auto'>
        <button type='button' className='btn btn-ghost' onClick={handleReset}>
          Đặt lại bộ lọc
        </button>
      </div>
    </div>
  );
};

export default MovieFilter;
