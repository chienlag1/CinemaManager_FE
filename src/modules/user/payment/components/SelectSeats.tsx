import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { IBookedSeat, IShowtime } from '../../../../types/showtime.type';
import React from 'react';

const SelectSeats = ({
  showtime,
  selectedSeats,
  onChange,
}: {
  showtime: IShowtime;
  selectedSeats: IBookedSeat[];
  onChange: (seats: IBookedSeat[]) => void;
}) => {
  const [roomLayoutSeats, setRoomLayoutSeats] = useState<IBookedSeat[]>([]);

  useEffect(() => {
    if (!showtime.room?.seats || showtime.room.seats.length === 0) {
      const generatedSeats: IBookedSeat[] = [];
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

      rows.forEach((row) => {
        for (let number = 1; number <= 10; number++) {
          generatedSeats.push({ row, number });
        }
      });
      setRoomLayoutSeats(generatedSeats);
    } else {
      // If there is seat data from API, map it to IBookedSeat[]
      const basicSeats = showtime.room.seats.map((seat) => ({
        row: seat.row,
        number: seat.number,
      }));
      setRoomLayoutSeats(basicSeats);
    }
  }, [showtime]); // Re-run when showtime changes

  // Helper function to check if a seat is booked for the current showtime
  const isSeatBooked = (seat: IBookedSeat) =>
    showtime.bookedSeats?.some(
      (s) => s.row === seat.row && s.number === seat.number
    );

  // Helper function to check if a seat is currently selected by the user
  const isSeatSelected = (seat: IBookedSeat) =>
    selectedSeats.some((s) => s.row === seat.row && s.number === seat.number);

  const toggleSeat = (seatToToggle: IBookedSeat) => {
    // If the seat is already booked, do nothing
    if (isSeatBooked(seatToToggle)) {
      return;
    }

    // Check if the seat is currently in the selectedSeats list
    const isCurrentlySelected = isSeatSelected(seatToToggle);

    let newSelectedSeats: IBookedSeat[];

    if (isCurrentlySelected) {
      // If selected, unselect it (filter out)
      newSelectedSeats = selectedSeats.filter(
        (s) => !(s.row === seatToToggle.row && s.number === seatToToggle.number)
      );
    } else {
      // If not selected, select it (add to list)
      newSelectedSeats = [...selectedSeats, seatToToggle];
    }
    onChange(newSelectedSeats); // Notify parent component of changes
  };

  // Get unique rows and sort them
  const rows = [...new Set(roomLayoutSeats.map((s) => s.row))].sort();
  // Get unique columns and sort them numerically
  const columns = [...new Set(roomLayoutSeats.map((s) => s.number))].sort(
    (a, b) => a - b
  );

  return (
    <div className='mb-6'>
      <h3 className='font-semibold text-lg mb-2'>Chọn ghế:</h3>

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
            <div></div> {/* Empty cell for alignment with row labels */}
            {columns.map((col) => (
              <div
                key={`col-${col}`}
                className='text-center text-sm text-gray-300 font-semibold'
              >
                {col}
              </div>
            ))}
            {rows.map((row) => (
              // Use React.Fragment or a div with display:contents for grid layout
              <React.Fragment key={`row-${row}`}>
                <div className='text-sm text-gray-300 font-semibold flex items-center justify-center'>
                  {row}
                </div>
                {columns.map((col) => {
                  const seat: IBookedSeat | undefined = roomLayoutSeats.find(
                    (s) => s.row === row && s.number === col
                  );

                  // If a seat position doesn't exist in the layout (e.g., an empty space)
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
                      disabled={booked} // Disable if seat is booked
                      onClick={() => toggleSeat(seat)}
                      className={clsx(
                        'w-10 h-10 rounded-sm text-xs font-medium border',
                        'flex items-center justify-center',
                        {
                          // Booked seats: Gray, not clickable
                          'bg-gray-400 cursor-not-allowed text-gray-700':
                            booked,
                          // Selected seats: Yellow (common for selection)
                          'bg-yellow-500 text-black': selected,
                          // Available seats: Light gray, clickable
                          'bg-gray-200 hover:bg-gray-300 text-gray-800':
                            !selected && !booked,
                        }
                      )}
                    >
                      {/* You can display the seat number here if desired */}
                      {/* {seat.number} */}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className='mt-6 flex flex-wrap justify-center space-x-4 text-sm text-gray-300'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-gray-200 border border-gray-400' />{' '}
              Trống
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-yellow-500 border border-yellow-600' />{' '}
              Đã chọn
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-gray-400 border border-gray-600' /> Đã
              đặt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectSeats;
