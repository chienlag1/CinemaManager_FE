import { Box, Typography } from '@mui/material';
import type { Seat } from '../../../../types/room.type';
import type { IShowtime } from '../../../../types/showtime.type';

interface Props {
  selectedShowtime?: IShowtime;
  selectedSeats: Seat[];
  bookedSeats: string[];
  onSeatToggle: (seat: Seat) => void;
}

export default function SeatMap({
  selectedShowtime,
  selectedSeats,
  bookedSeats,
  onSeatToggle,
}: Props) {
  // Generate seats based on availableSeats count
  const generateSeats = (totalSeats: number): Seat[] => {
    const seats: Seat[] = [];
    const seatsPerRow = 10;
    const totalRows = Math.ceil(totalSeats / seatsPerRow);

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const rowLetter = String.fromCharCode(65 + rowIndex); // A, B, C, D...

      for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
        // Stop if we've reached the total number of seats
        if (seats.length >= totalSeats) break;

        seats.push({
          row: rowLetter,
          number: seatNumber,
          _id: '',
          isOccupied: false,
        });
      }

      if (seats.length >= totalSeats) break;
    }

    return seats;
  };

  const renderSeatGrid = () => {
    if (!selectedShowtime) return null;

    // Use existing seats from room or generate based on availableSeats
    const seats =
      selectedShowtime.room.seats && selectedShowtime.room.seats.length > 0
        ? selectedShowtime.room.seats
        : generateSeats(selectedShowtime.availableSeats || 100);

    // Group seats by row for better layout
    const seatsByRow = seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {} as Record<string, Seat[]>);

    return Object.keys(seatsByRow)
      .sort() // Sort rows alphabetically
      .map((rowLetter) => (
        <div key={rowLetter} className='mb-3'>
          {/* Row label */}
          <div className='flex items-center gap-3'>
            <span className='w-8 text-center text-gray-400 font-medium text-sm'>
              {rowLetter}
            </span>

            {/* Seats in this row */}
            <div className='flex gap-2 justify-center flex-1'>
              {seatsByRow[rowLetter]
                .sort((a, b) => a.number - b.number) // Sort seats by number
                .map((seat) => {
                  const key = `${seat.row}${seat.number}`;
                  const isBooked = bookedSeats.includes(key);
                  const isSelected = selectedSeats.some(
                    (s) => s.row === seat.row && s.number === seat.number
                  );

                  return (
                    <button
                      key={key}
                      disabled={isBooked}
                      onClick={() => onSeatToggle(seat)}
                      className={`rounded-md w-10 h-10 flex items-center justify-center text-xs font-medium transition-all duration-200 border
                        ${
                          isBooked
                            ? 'bg-red-600 text-white cursor-not-allowed border-red-700 opacity-80'
                            : isSelected
                            ? 'bg-blue-600 text-white border-blue-700 scale-105 shadow-lg'
                            : 'bg-[#0f172a] hover:bg-[#334155] text-gray-200 border-[#334155] hover:border-[#475569]'
                        }`}
                      title={`Ghế ${seat.row}${seat.number}${
                        isBooked ? ' (Đã đặt)' : ''
                      }`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
            </div>

            <span className='w-8 text-center text-gray-400 font-medium text-sm'>
              {rowLetter}
            </span>
          </div>
        </div>
      ));
  };

  return (
    <Box className='flex-grow bg-[#1e293b] p-6 rounded-lg shadow-lg'>
      {selectedShowtime ? (
        <>
          <Typography
            variant='h6'
            className='mb-4 text-center font-bold text-gray-200'
          >
            Màn hình
          </Typography>

          {/* Screen representation */}
          <Box className='w-3/4 h-3 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full mx-auto mb-8 shadow-md' />

          {/* Seat grid */}
          <div className='max-w-4xl mx-auto'>{renderSeatGrid()}</div>

          {/* Aisle space indicator */}
          <div className='text-center text-xs text-gray-500 mt-4 mb-6'>
            ← Lối đi →
          </div>

          {/* Legend */}
          <Box className='mt-8 flex justify-center gap-6 text-sm text-gray-300'>
            <div className='flex items-center gap-2'>
              <span className='w-4 h-4 rounded-sm bg-[#0f172a] border border-[#334155]'></span>
              <span>Trống</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-4 h-4 rounded-sm bg-blue-600 border border-blue-700'></span>
              <span>Đã chọn</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-4 h-4 rounded-sm bg-red-600 border border-red-700'></span>
              <span>Đã đặt</span>
            </div>
          </Box>

          {/* Seat count info */}
          {selectedShowtime.availableSeats && (
            <Typography className='text-center text-gray-400 text-sm mt-4'>
              Tổng số ghế: {selectedShowtime.availableSeats} | Ghế trống:{' '}
              {selectedShowtime.availableSeats - bookedSeats.length}
            </Typography>
          )}
        </>
      ) : (
        <Typography className='text-center text-gray-400 h-96 flex items-center justify-center'>
          Vui lòng chọn một suất chiếu để xem sơ đồ ghế.
        </Typography>
      )}
    </Box>
  );
}
