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
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className='flex justify-center mt-6'>
      <nav className='inline-flex items-center bg-gray-200 rounded-lg p-1 shadow-sm'>
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-white hover:shadow-sm'
          }`}
        >
          ‹
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium mx-1 transition-all ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-white hover:shadow-sm'
          }`}
        >
          ›
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
