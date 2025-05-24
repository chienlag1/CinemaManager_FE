import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  LogOut,
  Film,
  CalendarClock,
} from 'lucide-react';

const SidebarAdmin = () => {
  return (
    <div className='h-screen w-64 bg-base-200 text-base-content fixed top-0 left-0 shadow-md z-50'>
      {/* Logo */}
      <div className='flex items-center gap-2 px-6 py-4 border-b border-base-300'>
        <span className='text-pink-500 text-2xl'>🍿</span>
        <span className='text-xl font-bold text-primary'>MyCinema</span>
      </div>

      {/* Navigation */}
      <nav className='flex flex-col px-4 py-4 space-y-2'>
        <Link
          to='/admin/dashboard'
          className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-300 transition'
        >
          <LayoutDashboard className='w-5 h-5' />
          <span>Dashboard</span>
        </Link>

        <Link
          to='/admin/users'
          className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-300 transition'
        >
          <Users className='w-5 h-5' />
          <span>Người dùng</span>
        </Link>

        <Link
          to='/admin/movies'
          className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-300 transition'
        >
          <Film className='w-5 h-5' />
          <span>Quản lý phim</span>
        </Link>

        <Link
          to='/admin/showtimes'
          className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-300 transition'
        >
          <CalendarClock className='w-5 h-5' />
          <span>Suất chiếu</span>
        </Link>

        <Link
          to='/logout'
          className='flex items-center gap-3 px-3 py-2 mt-4 rounded-md text-red-400 hover:bg-red-800/20 transition'
        >
          <LogOut className='w-5 h-5' />
          <span>Đăng xuất</span>
        </Link>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
