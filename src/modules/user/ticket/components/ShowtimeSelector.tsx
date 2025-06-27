import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material';

import type { IShowtime } from '../../../../types/showtime.type';

interface ShowtimeSelectorProps {
  showtimes: IShowtime[];
  selectedShowtimeId: string;
  onChange: (value: string) => void;
}

const ShowtimeSelector = ({
  showtimes,
  selectedShowtimeId,
  onChange,
}: ShowtimeSelectorProps) => {
  return (
    <Box
      className='bg-[#1e293b] p-4 rounded-xl shadow-md'
      sx={{
        border: '1px solid #334155',
      }}
    >
      {/* Tiêu đề */}
      <Box display='flex' alignItems='center' gap={1} mb={1}>
        <Typography variant='h6' fontWeight='bold' color='white'>
          Chọn suất chiếu
        </Typography>
      </Box>

      {/* Select dropdown */}
      <FormControl fullWidth>
        <Select
          labelId='showtime-label'
          value={selectedShowtimeId}
          onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
          fullWidth
          sx={{
            color: 'white',
            backgroundColor: '#0f172a',
            borderRadius: 2,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#334155',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3b82f6',
            },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        >
          {showtimes.length > 0 ? (
            showtimes.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {new Date(s.startTime).toLocaleString('vi-VN')} - {s.room.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value='' disabled>
              Không có suất chiếu nào
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ShowtimeSelector;
