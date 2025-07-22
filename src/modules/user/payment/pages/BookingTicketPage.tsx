// BookingTicketPage.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import BookingSummary from '../components/BookingSummary';
import type { IShowtime } from '../../../../types/showtime.type';
import { paymentApiService } from '../../../../services/api.payment';
import movieApiService from '../../../../services/api.movie';
import type { Seat } from '../../../../types/room.type';
import type { Movie } from '../../../../types/movie.type';
import SelectShowtime from '../components/SelectedShowtime';
import SelectSeats from '../components/SelectSeats';
import { Snackbar, Alert } from '@mui/material';

const BACKEND_BASE_URL = 'http://localhost:5000';

const BookingTicketPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<IShowtime | null>(
    null
  );
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('error');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (movieId) {
      movieApiService
        .getMovieById(movieId)
        .then((response) => {
          setMovie(response.data.movie);
        })
        .catch(console.error);
    }
  }, [movieId]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedShowtime]);

  const handleSubmit = useCallback(async () => {
    console.log('⏺️ DEBUG: selectedShowtime =', selectedShowtime);
    console.log('⏺️ DEBUG: selectedShowtime._id =', selectedShowtime?._id);
    console.log('⏺️ DEBUG: selectedSeats =', selectedSeats);

    if (!selectedShowtime || selectedSeats.length === 0) {
      setSnackbarMessage('Vui lòng chọn suất chiếu và ghế ngồi.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    try {
      setLoading(true);

      const totalPrice = selectedSeats.length * selectedShowtime.price;

      const returnUrlForPayOS = `${BACKEND_BASE_URL}/api/payment/return`;
      const cancelUrlForPayOS = `${BACKEND_BASE_URL}/api/payment/cancel`;

      const payload = {
        showtimeId: selectedShowtime._id,
        seats: selectedSeats.map((s) => ({ row: s.row, number: s.number })),
        totalPrice,
        returnUrl: returnUrlForPayOS, // Gửi URL backend cho PayOS
        cancelUrl: cancelUrlForPayOS, // Gửi URL backend cho PayOS
      };

      console.log('⏺️ DEBUG: Payload gửi lên API =', payload);

      const response = await paymentApiService.createTicketAndPay(payload);

      console.log('✅ DEBUG: Response từ createTicketAndPay =', response);

      const paymentUrl = response?.checkoutUrl || response?.paymentLink;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error('Không nhận được URL thanh toán từ API');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      if (error instanceof Error) {
        setSnackbarMessage(`Lỗi thanh toán: ${error.message}`);
      } else {
        setSnackbarMessage('Đã xảy ra lỗi không xác định khi thanh toán.');
      }
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }, [selectedShowtime, selectedSeats]);

  return (
    <div className='max-w-7xl mx-auto p-4 space-y-6 text-white'>
      <h1 className='text-3xl font-bold'>🎟️ Đặt vé xem phim</h1>
      {movie && <h2 className='text-2xl'>{movie.title}</h2>}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 space-y-6'>
          <div className='bg-gray-800 p-4 rounded-xl shadow-md'>
            <SelectShowtime movieId={movieId!} onSelect={setSelectedShowtime} />

            {selectedShowtime && (
              <SelectSeats
                showtime={selectedShowtime}
                selectedSeats={selectedSeats.map((s) => ({
                  row: s.row,
                  number: s.number,
                }))}
                onChange={(seats) =>
                  setSelectedSeats(
                    seats.map((s) => ({
                      row: s.row,
                      number: s.number,
                      isBooked: false,
                      status: 'selected',
                    }))
                  )
                }
              />
            )}
          </div>
        </div>

        <div className='md:col-span-1'>
          <div className='bg-gray-800 p-4 rounded-xl text-white shadow-md'>
            <BookingSummary
              selectedSeats={selectedSeats}
              showtime={selectedShowtime}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Optional: Loading overlay */}
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg text-black'>
            <div className='flex items-center space-x-3'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
              <span>Đang chuyển đến trang thanh toán...</span>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BookingTicketPage;
