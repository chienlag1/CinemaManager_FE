import React, { useState } from 'react';

interface MovieFilterProps {
  onFilterChange: (filter: any) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  // CHỈNH SỬA TẠI ĐÂY: Thay đổi kiểu của isShowing từ 'boolean | ""' thành 'string'
  const [isShowing, setIsShowing] = useState<string>(''); // '' để đại diện cho "tất cả"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa/thường
    }
    // CHỈNH SỬA TẠI ĐÂY: Chuyển đổi giá trị string từ select thành boolean hoặc bỏ qua nếu là rỗng
    if (isShowing !== '') {
      filter.isShowing = isShowing === 'true'; // Chuyển đổi 'true' -> true, 'false' -> false
    }
    onFilterChange(filter);
  };

  const handleReset = () => {
    setTitle('');
    setIsShowing('');
    onFilterChange({}); // Xóa tất cả các bộ lọc
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-wrap items-center gap-4 bg-base-200 p-4 rounded-lg shadow-md'
    >
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
          <span className='label-text'>Trạng thái:</span>
        </label>
        <select
          className='select select-bordered'
          // CHỈNH SỬA TẠI ĐÂY: isShowing bây giờ là string, khớp với yêu cầu của select
          value={isShowing}
          // CHỈNH SỬA TẠI ĐÂY: Lưu trực tiếp giá trị string từ select vào state
          onChange={(e) => setIsShowing(e.target.value)}
        >
          <option value=''>Tất cả</option>
          <option value='true'>Đang chiếu</option>
          <option value='false'>Sắp chiếu</option>
        </select>
      </div>

      <div className='form-control mt-auto'>
        <button type='submit' className='btn btn-primary mr-2'>
          Tìm kiếm
        </button>
        <button type='button' className='btn btn-ghost' onClick={handleReset}>
          Đặt lại
        </button>
      </div>
    </form>
  );
};

export default MovieFilter;
