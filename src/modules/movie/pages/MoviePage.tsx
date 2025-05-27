// movie/pages/MoviePage.tsx
import React, { useState } from 'react';
import MovieListPage from '../components/MovieListPage';

interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    description: 'Sau khi Thanos xoá sổ một nửa vũ trụ...',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    genre: 'action',
  },
  {
    id: 2,
    title: 'Inception',
    description: 'Một tên trộm chuyên đánh cắp thông tin thông qua giấc mơ...',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    genre: 'science fiction',
  },
  {
    id: 3,
    title: 'Interstellar',
    description: 'Trong tương lai, một nhóm phi hành gia du hành qua hố đen...',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    genre: 'science fiction',
  },
  {
    id: 4,
    title: 'The Dark Knight',
    description: 'Batman đối đầu Joker ở Gotham...',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    genre: 'action',
  },
  {
    id: 5,
    title: 'The Matrix',
    description: 'Một hacker khám phá sự thật về thế giới mô phỏng...',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    genre: 'science fiction',
  },
];

const genres = ['All', 'action', 'science fiction'];

const MoviePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredMovies = mockMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className='p-6'>
      {/* Search & Filter Controls with DaisyUI */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
        {/* Search Box */}
        <div className='form-control w-full sm:w-1/2'>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 opacity-50'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z'
              />
            </svg>
            <input
              type='text'
              className='grow'
              placeholder='Seach for movies...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        {/* Genre Filter */}
        <div className='flex justify-end w-full mb-6'>
          <div className='form-control w-full sm:w-1/3'>
            <select
              className='select select-bordered'
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Movie List */}
      <MovieListPage movies={filteredMovies} />
    </div>
  );
};

export default MoviePage;
