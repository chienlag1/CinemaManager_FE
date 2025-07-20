import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign='center' mt={5}>
      <Typography variant='h5' color='error' gutterBottom>
        Thanh toán không thành công hoặc đã bị hủy!
      </Typography>
      <Typography variant='body1' mb={2}>
        Vui lòng kiểm tra lại thông tin hoặc thử lại sau.
      </Typography>
      <Button variant='contained' onClick={() => navigate('/')}>
        Quay về trang chủ
      </Button>
    </Box>
  );
};

export default PaymentFailurePage;
