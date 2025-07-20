import type { Seat } from '../../../../types/room.type';
import type { IShowtime } from '../../../../types/showtime.type';

interface BookingSummaryProps {
  selectedSeats: Seat[];
  showtime: IShowtime | null;
  onSubmit: () => void;
  loading?: boolean; // Add loading prop
}

export default function BookingSummary({
  selectedSeats,
  showtime,
  onSubmit,
  loading = false,
}: BookingSummaryProps) {
  const seatPrice = showtime?.price || 0;
  const grandTotal = selectedSeats.length * seatPrice;
  const isDisabled = selectedSeats.length === 0 || loading;

  return (
    <div className='mt-6 p-4 bg-gray-800 rounded-xl space-y-4 text-white'>
      <h2 className='text-xl font-semibold'>Your Selected Seats</h2>

      {/* Hiển thị số lượng ghế tổng */}
      <div className='text-lg font-medium'>{selectedSeats.length} Seats</div>

      {/* Danh sách ghế đã chọn */}
      <div className='flex flex-wrap gap-2'>
        {selectedSeats.map((s) => (
          <span
            key={`${s.row}${s.number}`}
            className='bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold'
          >
            {s.row.toUpperCase()}
            {s.number}
          </span>
        ))}
      </div>

      {/* Bảng giá chi tiết */}
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Price per seat:</span>
          <span>{seatPrice.toLocaleString('vi-VN')} VND</span>
        </div>
      </div>

      {/* Tổng cộng */}
      <div className='border-t border-gray-700 pt-4 flex justify-between items-center text-xl font-bold'>
        <span>Total</span>
        <span>{grandTotal.toLocaleString('vi-VN')} VND</span>
      </div>

      {/* Nút Thêm đồ ăn */}
      <button
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={loading}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
            clipRule='evenodd'
          />
        </svg>
        Add Foods
      </button>

      {/* Nút Thanh toán với PayOS */}
      <button
        onClick={onSubmit}
        disabled={isDisabled}
        className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-200 mt-2 flex items-center justify-center gap-2 ${
          isDisabled
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-600 hover:transform hover:scale-105'
        }`}
      >
        {loading ? (
          <>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-black'></div>
            <span>Đang xử lý...</span>
          </>
        ) : (
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
              <path
                fillRule='evenodd'
                d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                clipRule='evenodd'
              />
            </svg>
            <span>Thanh toán với PayOS</span>
          </>
        )}
      </button>

      {/* Thông báo khi chưa chọn ghế */}
      {selectedSeats.length === 0 && (
        <p className='text-yellow-400 text-sm text-center'>
          Vui lòng chọn ghế để tiếp tục thanh toán
        </p>
      )}
    </div>
  );
}
