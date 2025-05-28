import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

const AdminSidebar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className='navbar bg-base-100 shadow-md px-4'>
      <div className='navbar-start'>
        <Link to='/' className='text-xl font-bold text-primary'>
          🍿 MyCinema
        </Link>
      </div>

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link to='/'>Manager</Link>
          </li>
          <li>
            <Link to='/movies'>Phim</Link>
          </li>
          <li>
            <Link to='/about'>quản lí</Link>
          </li>
        </ul>
      </div>

      <div className='navbar-end'>
        {isSignedIn ? (
          <UserButton afterSignOutUrl='/login' />
        ) : (
          <Link to='/login' className='btn btn-outline btn-sm'>
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default AdminSidebar;
