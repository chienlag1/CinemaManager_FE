// src/pages/Booking/components/SelectSeats.tsx
import React, { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import type { Seat } from '../../../../types/room.type';
import type { IBookedSeat, IShowtime } from '../../../../types/showtime.type';

interface SelectSeatsProps {
  showtime: IShowtime;
  selectedSeats: IBookedSeat[];
  onChange: (seats: IBookedSeat[]) => void;
}

const SelectSeats: React.FC<SelectSeatsProps> = ({
  showtime,
  selectedSeats,
  onChange,
}) => {
  const [roomLayoutSeats, setRoomLayoutSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (showtime.room?.seats && showtime.room.seats.length > 0) {
      setRoomLayoutSeats(showtime.room.seats);
    } else {
      const generatedSeats: Seat[] = [];
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      rows.forEach((row) => {
        for (let number = 1; number <= 10; number++) {
          generatedSeats.push({ row, number });
        }
      });
      setRoomLayoutSeats(generatedSeats);
    }
  }, [showtime.room?.seats]);
  const isSeatBooked = (seat: IBookedSeat) => {
    return showtime.bookedSeats?.some(
      (s: IBookedSeat) => s.row === seat.row && s.number === seat.number
    );
  };

  const isSeatSelected = (seat: IBookedSeat) =>
    selectedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  const toggleSeat = (seatToToggle: IBookedSeat) => {
    if (isSeatBooked(seatToToggle)) {
      return;
    }

    const isCurrentlySelected = isSeatSelected(seatToToggle);
    let newSelectedSeats: IBookedSeat[];

    if (isCurrentlySelected) {
      newSelectedSeats = selectedSeats.filter(
        (s) => !(s.row === seatToToggle.row && s.number === seatToToggle.number)
      );
    } else {
      newSelectedSeats = [...selectedSeats, seatToToggle];
    }
    onChange(newSelectedSeats);
  };

  const { rows, columns } = useMemo(() => {
    const uniqueRows = [...new Set(roomLayoutSeats.map((s) => s.row))].sort();
    const uniqueColumns = [
      ...new Set(roomLayoutSeats.map((s) => s.number)),
    ].sort((a, b) => a - b);
    return { rows: uniqueRows, columns: uniqueColumns };
  }, [roomLayoutSeats]);

  return (
    <div className='mb-6'>
      <h3 className='font-semibold text-lg mb-2 text-white'>Chọn ghế:</h3>
      <div className='overflow-x-auto overflow-y-auto flex justify-center'>
        <div className='inline-block'>
          <div className='bg-gray-600 h-8 w-full rounded-b-lg mb-4 flex items-center justify-center text-sm text-white font-bold'>
            MÀN HÌNH
          </div>

          <div
            className='grid gap-1'
            style={{
              gridTemplateColumns: `40px repeat(${columns.length}, 40px)`,
            }}
          >
            <div></div>
            {columns.map((col) => (
              <div
                key={`col-${col}`}
                className='text-center text-sm text-gray-300 font-semibold'
              >
                {col}
              </div>
            ))}
            {rows.map((row) => (
              <React.Fragment key={`row-${row}`}>
                <div className='text-sm text-gray-300 font-semibold flex items-center justify-center'>
                  {row}
                </div>
                {columns.map((col) => {
                  const seat: Seat | undefined = roomLayoutSeats.find(
                    (s) => s.row === row && s.number === col
                  );

                  if (!seat) {
                    return (
                      <div key={`${row}-${col}`} className='w-10 h-10'></div>
                    );
                  }

                  const booked = isSeatBooked(seat);
                  const selected = isSeatSelected(seat);

                  return (
                    <button
                      key={`${row}-${col}`}
                      disabled={booked}
                      onClick={() => toggleSeat(seat)}
                      className={clsx(
                        'w-10 h-10 rounded-sm text-xs font-medium border',
                        'flex items-center justify-center',
                        {
                          // Ghế đã đặt: Màu xám đậm, không thể click
                          'bg-gray-500 cursor-not-allowed text-gray-700 border-gray-600':
                            booked,
                          // Ghế đang chọn: Màu vàng, chữ đen
                          'bg-yellow-500 text-black border-yellow-600':
                            selected,
                          // Ghế trống: Màu xám nhạt, có thể click
                          'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300':
                            !selected && !booked,
                        }
                      )}
                    >
                      {' '}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className='mt-6 flex flex-wrap justify-center space-x-4 text-sm text-gray-300'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-gray-200 border border-gray-300' />{' '}
              Trống
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-yellow-500 border border-yellow-600' />{' '}
              Đã chọn
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-gray-500 border border-gray-600' /> Đã
              đặt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeats;
