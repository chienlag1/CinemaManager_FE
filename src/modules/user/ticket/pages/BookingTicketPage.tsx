// BookingTicketPage.tsx
import { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import movieApiService from '../../../../services/api.movie';
import * as showtimeApiService from '../../../../services/api.showtime';
import { ticketApiService } from '../../../../services/api.ticket';
import type { Seat } from '../../../../types/room.type';
import type { IShowtime } from '../../../../types/showtime.type';
import type { Movie } from '../../../../types/movie.type';
import SelectedSeatSummary from '../components/SelectedSeatSummary';
import SeatMap from '../components/ShowSeat';
import ShowtimeSelector from '../components/ShowtimeSelector';
import LoadingIndicator from '../../../../components/loading/LoadingIndicator';

const BookingTicketPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<IShowtime[]>([]);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieAndShowtimes = async () => {
      try {
        setIsInitialLoading(true);
        const movieData = await movieApiService.getMovieById(movieId);
        if (!movieData?.data?.movie) {
          setMovie(null);
          return;
        }
        setMovie(movieData.data.movie);

        const showtimesData = await showtimeApiService.getAllShowtimes({
          movie: movieId,
        });
        setShowtimes(showtimesData);
      } catch (error) {
        setMovie(null);
        setShowtimes([]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchMovieAndShowtimes();
  }, [movieId]);

  useEffect(() => {
    if (!selectedShowtimeId) {
      setBookedSeats([]);
      setSelectedSeats([]);
      return;
    }
    showtimeApiService
      .getShowtimeById(selectedShowtimeId)
      .then((data) => {
        const booked =
          data.bookedSeats?.map((s) => `${s.row}${s.number}`) || [];
        setBookedSeats(booked);
        setSelectedSeats([]);
      })
      .catch(() => setBookedSeats([]));
  }, [selectedShowtimeId]);

  const handleSeatToggle = (seat: Seat) => {
    const exists = selectedSeats.some(
      (s) => s.row === seat.row && s.number === seat.number
    );
    setSelectedSeats((prev) =>
      exists
        ? prev.filter((s) => s.row !== seat.row || s.number !== seat.number)
        : [...prev, seat]
    );
  };

  const handleRemoveSelectedSeat = (seat: Seat) => {
    setSelectedSeats((prev) =>
      prev.filter((s) => s.row !== seat.row || s.number !== seat.number)
    );
  };

  const handleBooking = async () => {
    if (!selectedShowtimeId || selectedSeats.length === 0) {
      alert('Vui lòng chọn suất chiếu và ít nhất một ghế.');
      return;
    }
    try {
      setLoading(true);
      await ticketApiService.createTicket({
        showtimeId: selectedShowtimeId,
        seats: selectedSeats,
      });
      alert('Đặt vé thành công!');
      navigate('/');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Lỗi khi đặt vé. Vui lòng thử lại.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectedShowtime = showtimes.find((s) => s._id === selectedShowtimeId);
  const totalPrice = selectedShowtime
    ? selectedShowtime.price * selectedSeats.length
    : 0;

  if (isInitialLoading) {
    return <LoadingIndicator message='Đang tải thông tin suất chiếu...' />;
  }

  if (!movie) {
    return (
      <div className='min-h-screen bg-[#0f172a] text-white flex items-center justify-center'>
        <p className='text-lg'>Không tìm thấy thông tin phim.</p>
      </div>
    );
  }

  return (
    <div className='p-6 text-white bg-[#0f172a] min-h-screen'>
      <h1 className='text-3xl font-bold mb-4 text-white'>
        Đặt vé: {movie.title}
      </h1>

      <ShowtimeSelector
        showtimes={showtimes}
        selectedShowtimeId={selectedShowtimeId}
        onChange={(value) => setSelectedShowtimeId(value)}
      />
      <Box className='flex flex-col lg:flex-row gap-6 pt-7'>
        <SeatMap
          selectedShowtime={selectedShowtime}
          selectedSeats={selectedSeats}
          bookedSeats={bookedSeats}
          onSeatToggle={handleSeatToggle}
        />

        <SelectedSeatSummary
          selectedSeats={selectedSeats}
          selectedShowtime={selectedShowtime}
          totalPrice={totalPrice}
          loading={loading}
          onRemoveSeat={handleRemoveSelectedSeat}
          onBooking={handleBooking}
        />
      </Box>
      <div className='mt-8 flex justify-end gap-4'>
        <Button
          onClick={() => navigate(-1)}
          variant='outlined'
          sx={{
            color: 'white',
            borderColor: '#3b82f6',
            '&:hover': { borderColor: '#2563eb' },
          }}
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default BookingTicketPage;
