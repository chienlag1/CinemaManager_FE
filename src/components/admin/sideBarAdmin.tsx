import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

const AdminSidebar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className='flex h-screen'>
      {' '}
      {/* Flex container for the whole layout */}
      {/* Sidebar */}
      <div className='w-64 bg-base-200 text-base-content flex flex-col p-4 shadow-xl rounded-box'>
        <div className='flex-none mb-6'>
          <Link
            to='/'
            className='text-2xl font-extrabold text-primary flex items-center gap-2'
          >
            <span className='text-3xl'>🍿</span> MyCinema
          </Link>
        </div>

        <ul className='menu p-4 w-full text-lg'>
          <li>
            <Link
              to='/admin'
              className='flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-base-300 active:bg-primary active:text-primary-content'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='/admin/movies'
              className='flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-base-300 active:bg-primary active:text-primary-content'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 4v16M17 4v16M4 8h16M4 12h16M4 16h16M4 20h16'
                />
              </svg>
              Movie Management
            </Link>
          </li>
          <li>
            <Link
              to='/admin/movies'
              className='flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-base-300 active:bg-primary active:text-primary-content'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 4v16M17 4v16M4 8h16M4 12h16M4 16h16M4 20h16'
                />
              </svg>
              Screening Management
            </Link>
          </li>
          <li>
            <Link
              to='/admin/users'
              className='flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-base-300 active:bg-primary active:text-primary-content'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M9 20v-2a3 3 0 00-5.356-1.857M9 20H2v-2a3 3 0 015.356-1.857M9 20H7m0 0H2m7 0a3 3 0 01-5.356-1.857M7 20v-2a3 3 0 00-5.356-1.857M7 20H2'
                />
              </svg>
              User Management
            </Link>
          </li>
          {/* Thêm các mục quản lý khác nếu cần */}
        </ul>

        <div className='mt-auto flex items-center justify-center p-4'>
          {isSignedIn ? (
            <UserButton afterSignOutUrl='/login' />
          ) : (
            <Link to='/login' className='btn btn-primary btn-sm w-full'>
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      {/* Main content area - This will be handled by LayoutAdmin */}
      {/* You'll need to adjust LayoutAdmin to render children next to this sidebar */}
    </div>
  );
};

export default AdminSidebar;
