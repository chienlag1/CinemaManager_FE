import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import type { Seat } from '../../../../types/room.type';
import type { IShowtime } from '../../../../types/showtime.type';

interface Props {
  selectedSeats: Seat[];
  selectedShowtime?: IShowtime;
  totalPrice: number;
  loading: boolean;
  onRemoveSeat: (seat: Seat) => void;
  onBooking: () => void;
}

export default function SelectedSeatSummary({
  selectedSeats,
  selectedShowtime,
  totalPrice,
  loading,
  onRemoveSeat,
  onBooking,
}: Props) {
  return (
    <Box className='w-full lg:w-80 bg-[#1e293b] p-6 rounded-lg shadow-lg flex-shrink-0'>
      <Typography variant='h6' className='font-bold mb-4 text-gray-200'>
        Ghế đã chọn
      </Typography>

      {selectedSeats.length > 0 ? (
        <List>
          {selectedSeats.map((seat) => (
            <ListItem
              key={`${seat.row}${seat.number}`}
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => onRemoveSeat(seat)}
                  sx={{ color: '#ef4444' }}
                />
              }
              sx={{ borderBottom: '1px solid #334155', py: 1 }}
            >
              <ListItemText
                primary={`Ghế ${seat.row}${seat.number}`}
                secondary={
                  selectedShowtime
                    ? `${selectedShowtime.price.toLocaleString('vi-VN')} VND`
                    : ''
                }
                primaryTypographyProps={{ color: 'white' }}
                secondaryTypographyProps={{ color: 'gray.400' }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography className='text-gray-400'>
          Chưa có ghế nào được chọn.
        </Typography>
      )}

      <Box className='mt-6 pt-4 border-t border-t-[#334155]'>
        <Typography variant='body1' className='text-gray-300 mb-2'>
          Tổng cộng:
        </Typography>
        <Typography variant='h5' className='font-bold text-green-400'>
          {totalPrice.toLocaleString('vi-VN')} VND
        </Typography>
      </Box>

      <Button
        onClick={onBooking}
        disabled={!selectedSeats.length || !selectedShowtime || loading}
        variant='contained'
        fullWidth
        sx={{
          mt: 4,
          bgcolor: '#ef4444',
          '&:hover': { bgcolor: '#dc2626' },
          '&.Mui-disabled': { bgcolor: '#ef444480', color: '#cbd5e1' },
          py: 1.5,
          fontSize: '1.1rem',
        }}
      >
        {loading ? (
          <CircularProgress size={24} color='inherit' />
        ) : (
          'Xác nhận đặt vé'
        )}
      </Button>

      <Typography variant='body2' className='text-gray-500 mt-6 text-center'>
        Lưu ý: Ghế VIP và Lovebox có thể có giá khác.
      </Typography>
    </Box>
  );
}
