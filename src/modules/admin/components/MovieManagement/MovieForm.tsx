import React, { useState, useEffect } from 'react';

import api from '../../../../services/api.axios'; // Import instance axios đã cấu hình
import Swal from 'sweetalert2';
import type { Movie } from '../../../../types/movie.type'; // Import Movie type

interface MovieFormProps {
  movie: Movie | null; // Null khi thêm mới, có dữ liệu khi chỉnh sửa
  onSuccess: (message: string) => void;
  onCancel: () => void;
}

const movieGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Drama', // Đã sửa "DraMa" thành "Drama" để thống nhất với schema
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

const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    description: '',
    releaseDate: '',
    duration: 0,
    genre: [],
    posterUrl: '',
    trailerUrl: '',
    rating: 5,
    isShowing: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (movie) {
      setFormData({
        ...movie,
        // Chuyển Date object thành ISO string để hiển thị trong input type="date"
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      // Reset form khi thêm mới
      setFormData({
        title: '',
        description: '',
        releaseDate: '',
        duration: 0,
        genre: [],
        posterUrl: '',
        trailerUrl: '',
        rating: 5,
        isShowing: false,
      });
    }
  }, [movie]); // Thêm movie vào dependency array để useEffect chạy lại khi movie thay đổi

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (name === 'genre') {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).options
      )
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({ ...formData, genre: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' }); // Xóa lỗi khi người dùng thay đổi input
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Tiêu đề không được để trống.';
    if (!formData.description)
      newErrors.description = 'Mô tả không được để trống.';
    if (!formData.releaseDate)
      newErrors.releaseDate = 'Ngày phát hành không được để trống.';
    // Kiểm tra duration phải là số và lớn hơn 0
    if (
      formData.duration === undefined ||
      formData.duration === null ||
      formData.duration <= 0
    )
      newErrors.duration = 'Thời lượng phải là số và lớn hơn 0.';
    if (formData.genre && formData.genre.length === 0)
      newErrors.genre = 'Phải chọn ít nhất một thể loại.';
    if (!formData.posterUrl)
      newErrors.posterUrl = 'URL poster không được để trống.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        // Thêm customClass cho Swal.fire
        icon: 'error',
        title: 'Lỗi nhập liệu',
        text: 'Vui lòng điền đầy đủ và đúng thông tin.',
        customClass: {
          popup: 'swal2-dark-theme',
        },
      });
      return;
    }

    setLoading(true);
    try {
      if (movie?._id) {
        // Cập nhật phim
        await api.patch(`/movies/${movie._id}`, formData);
        onSuccess('Phim đã được cập nhật thành công!');
      } else {
        // Thêm phim mới
        await api.post('/movies', formData);
        onSuccess('Phim đã được thêm mới thành công!');
      }
    } catch (err: any) {
      Swal.fire({
        // Thêm customClass cho Swal.fire
        icon: 'error',
        title: 'Lỗi!',
        text: err.response?.data?.message || 'Đã xảy ra lỗi khi lưu phim.',
        customClass: {
          popup: 'swal2-dark-theme',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        {/* Title */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Tiêu đề phim:</span>
          </label>
          <input
            type='text'
            name='title'
            placeholder='Tên phim'
            className={`input input-bordered w-full ${
              errors.title ? 'input-error' : ''
            }`}
            value={formData.title || ''}
            onChange={handleChange}
          />
          {errors.title && (
            <label className='label text-error text-sm'>{errors.title}</label>
          )}
        </div>

        {/* Duration */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Thời lượng (phút):</span>
          </label>
          <input
            type='number'
            name='duration'
            placeholder='Thời lượng'
            className={`input input-bordered w-full ${
              errors.duration ? 'input-error' : ''
            }`}
            // Đảm bảo giá trị là number hoặc rỗng, tránh undefined
            value={
              formData.duration !== undefined && formData.duration !== null
                ? formData.duration
                : ''
            }
            onChange={handleChange}
            min={1}
          />
          {errors.duration && (
            <label className='label text-error text-sm'>
              {errors.duration}
            </label>
          )}
        </div>

        {/* Release Date */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Ngày phát hành:</span>
          </label>
          <input
            type='date'
            name='releaseDate'
            className={`input input-bordered w-full ${
              errors.releaseDate ? 'input-error' : ''
            }`}
            value={formData.releaseDate || ''}
            onChange={handleChange}
          />
          {errors.releaseDate && (
            <label className='label text-error text-sm'>
              {errors.releaseDate}
            </label>
          )}
        </div>

        {/* Rating */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Đánh giá (1-10):</span>
          </label>
          <input
            type='number'
            name='rating'
            placeholder='Rating'
            className='input input-bordered w-full'
            value={
              formData.rating !== undefined && formData.rating !== null
                ? formData.rating
                : ''
            }
            onChange={handleChange}
            min={1}
            max={10}
          />
        </div>

        {/* Genre */}
        <div className='form-control col-span-1 md:col-span-2'>
          <label className='label'>
            <span className='label-text'>Thể loại:</span>
          </label>
          <select
            name='genre'
            multiple
            className={`select select-bordered w-full ${
              errors.genre ? 'select-error' : ''
            }`}
            // Đảm bảo value là mảng, có thể là rỗng nếu chưa chọn
            value={formData.genre || []}
            onChange={handleChange}
            size={movieGenres.length > 5 ? 5 : movieGenres.length} // Hiển thị nhiều tùy chọn hơn
          >
            {movieGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <label className='label text-error text-sm'>{errors.genre}</label>
          )}
          <label className='label text-sm text-info'>
            <span className='label-text-alt'>
              Giữ Ctrl/Cmd và click để chọn nhiều thể loại.
            </span>
          </label>
        </div>

        {/* Poster URL */}
        <div className='form-control col-span-1 md:col-span-2'>
          <label className='label'>
            <span className='label-text'>URL Poster:</span>
          </label>
          <input
            type='text'
            name='posterUrl'
            placeholder='http://example.com/poster.jpg'
            className={`input input-bordered w-full ${
              errors.posterUrl ? 'input-error' : ''
            }`}
            value={formData.posterUrl || ''}
            onChange={handleChange}
          />
          {errors.posterUrl && (
            <label className='label text-error text-sm'>
              {errors.posterUrl}
            </label>
          )}
        </div>

        {/* Trailer URL */}
        <div className='form-control col-span-1 md:col-span-2'>
          <label className='label'>
            <span className='label-text'>URL Trailer (tùy chọn):</span>
          </label>
          <input
            type='text'
            name='trailerUrl'
            placeholder='http://example.com/trailer.mp4'
            className='input input-bordered w-full'
            value={formData.trailerUrl || ''}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className='form-control col-span-1 md:col-span-2'>
          <label className='label'>
            <span className='label-text'>Mô tả:</span>
          </label>
          <textarea
            name='description'
            placeholder='Mô tả phim'
            className={`textarea textarea-bordered h-24 w-full ${
              errors.description ? 'textarea-error' : ''
            }`}
            value={formData.description || ''}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <label className='label text-error text-sm'>
              {errors.description}
            </label>
          )}
        </div>

        {/* Is Showing Checkbox */}
        <div className='form-control col-span-1 md:col-span-2'>
          <label className='label cursor-pointer'>
            <span className='label-text'>Đang chiếu:</span>
            <input
              type='checkbox'
              name='isShowing'
              className='toggle toggle-primary'
              checked={formData.isShowing || false}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className='modal-action justify-end space-x-2'>
        <button type='button' className='btn btn-ghost' onClick={onCancel}>
          Hủy
        </button>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            'Lưu Phim'
          )}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
