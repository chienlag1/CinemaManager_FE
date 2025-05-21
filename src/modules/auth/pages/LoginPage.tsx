import { SignIn, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

const LoginPage = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        console.log('Clerk token:', token);
      } catch (err) {
        console.error('Clerk protect error:', err);
      }
    };
    fetchToken();
  }, [getToken]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200'>
      <div className='w-full max-w-md p-8 shadow-lg bg-base-100 rounded-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>Đăng nhập</h1>
        <p className='text-center mb-4'>Chào mừng bạn trở lại!</p>
        <SignIn />
      </div>
    </div>
  );
};

export default LoginPage;
