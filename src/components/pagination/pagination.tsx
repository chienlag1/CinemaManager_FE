// src/components/pagination/Pagination.tsx

import React from 'react';

interface PaginationProps {
  totalItems: number; // Tổng số lượng mục (phim)
  itemsPerPage: number; // Số lượng mục hiển thị trên mỗi trang
  currentPage: number; // Trang hiện tại đang được hiển thị
  onPageChange: (page: number) => void; // Callback khi người dùng thay đổi trang
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  // Tính toán tổng số trang
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Tạo một mảng các số trang để render các button
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Không hiển thị phân trang nếu chỉ có 1 trang hoặc không có mục nào
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='join'>
      {/* Nút Previous */}
      <button
        className='join-item btn'
        disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu tiên
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>

      {/* Các nút số trang */}
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            currentPage === page ? 'btn-active' : ''
          }`} // Đánh dấu trang hiện tại
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        className='join-item btn'
        disabled={currentPage === totalPages} // Vô hiệu hóa nếu đang ở trang cuối cùng
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
