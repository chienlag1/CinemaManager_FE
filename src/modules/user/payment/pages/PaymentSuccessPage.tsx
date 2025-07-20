// src/pages/Booking/PaymentSuccessPage.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Typography,
  Button,
  Box,
  Container,
  Paper,
} from '@mui/material';
import { ticketApiService } from '../../../../services/api.ticket';
import type { Ticket } from '../../../../types/ticket.type';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const status = searchParams.get('status');
        const code = searchParams.get('code');
        const ticketId = searchParams.get('ticketId');

        if (status !== 'PAID' || code !== '00' || !ticketId) {
          // ❌ Không hợp lệ → redirect sang trang thất bại
          navigate('/payment-failure');
          return;
        }

        const data = await ticketApiService.getTicketById(ticketId);
        setTicket(data);
      } catch (err) {
        console.error('❌ Lỗi khi lấy vé:', err);
        navigate('/payment-failure');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentResult();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='sm'>
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 5, textAlign: 'center' }}
      >
        <Typography variant='h5' color='primary' gutterBottom>
          🎉 Thanh toán thành công!
        </Typography>

        <Typography variant='body1' gutterBottom>
          Mã vé: <strong>{ticket?._id}</strong>
        </Typography>
        <Typography variant='body1' gutterBottom>
          Mã đơn hàng PayOS: <strong>{searchParams.get('orderCode')}</strong>
        </Typography>
        <Typography variant='body1' gutterBottom>
          Phim: <strong>{ticket?.showtime.movie.title}</strong>
        </Typography>
        <Typography variant='body1' gutterBottom>
          Suất chiếu:{' '}
          <strong>
            {ticket?.showtime.startTime
              ? new Date(ticket.showtime.startTime).toLocaleString()
              : ''}
          </strong>
        </Typography>
        <Typography variant='body1' gutterBottom>
          Ghế:{' '}
          <strong>
            {ticket?.seats.map((s) => `${s.row}${s.number}`).join(', ')}
          </strong>
        </Typography>

        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
          onClick={() => navigate('/')}
        >
          Quay về trang chủ
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccessPage;
