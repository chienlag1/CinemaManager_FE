// components/PayOSPaymentButton.tsx
import { Button } from '@mui/material';
import { useState } from 'react';
import { paymentApiService } from '../../../../services/api.payment';
import { Snackbar, Alert } from '@mui/material'; // Thêm import này

interface PayOSPaymentButtonProps {
  ticketId?: string; // Có thể không cần ticketId ở đây nếu BookingTicketPage đã xử lý
  totalPrice: number;
  showtimeId: string;
  seats: { row: string; number: number }[];
}

const PayOSPaymentButton = ({
  totalPrice,
  showtimeId,
  seats,
}: PayOSPaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('error');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePay = async () => {
    try {
      setLoading(true);

      // Gửi URL gốc, backend sẽ thêm các tham số
      const returnUrl = `${window.location.origin}/payment-success`;
      const cancelUrl = `${window.location.origin}/payment-cancel`;

      const { paymentLink } = await paymentApiService.createTicketAndPay({
        showtimeId,
        seats,
        totalPrice,
        returnUrl,
        cancelUrl,
      });

      if (!paymentLink) {
        throw new Error('Không nhận được URL thanh toán từ API');
      }

      window.location.href = paymentLink;
    } catch (error) {
      console.error('Failed to initiate payment:', error);
      setSnackbarMessage('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? 'Đang xử lý...' : 'Thanh toán với PayOS'}
      </Button>
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
    </>
  );
};

export default PayOSPaymentButton;
