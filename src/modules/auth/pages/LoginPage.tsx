import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200'>
      <div className='w-full max-w-md p-8 shadow-lg bg-base-100 rounded-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>Đăng nhập</h1>
        <p className='text-center mb-4'>Chào mừng bạn trở lại!</p>
        <SignIn afterSignInUrl='/' /> {/* Thêm dòng này */}
      </div>
    </div>
  );
};

export default LoginPage;
