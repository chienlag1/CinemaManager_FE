import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className='w-full flex justify-center pt-4 px-4'>
      <div className='w-full max-w-screen-xl bg-[#1f1f1f]/80 text-white rounded-full px-6 py-3 flex items-center justify-between shadow-lg backdrop-blur-md'>
        {/* Left: Logo + Menu */}
        <div className='flex items-center gap-4'>
          <Link to='/' className='text-2xl font-extrabold tracking-wide'>
            iCINEMA<span className='text-blue-500'>●</span>
          </Link>
        </div>

        {/* Center: Menu */}
        <nav className='hidden lg:flex gap-8 text-base font-medium'>
          <Link to='/' className='hover:text-blue-500 transition'>
            Trang chủ
          </Link>
          <Link to='/movies' className='hover:text-blue-500 transition'>
            Phim
          </Link>
          <Link to='/about' className='hover:text-blue-500 transition'>
            Giới thiệu
          </Link>
        </nav>

        {/* Right: Location + Auth */}
        <div className='flex items-center gap-5 text-sm'>
          {isSignedIn ? (
            <UserButton afterSignOutUrl='/login' />
          ) : (
            <Link
              to='/login'
              className='flex items-center gap-1 hover:text-orange-400'
            >
              <FaUser className='text-sm' />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
