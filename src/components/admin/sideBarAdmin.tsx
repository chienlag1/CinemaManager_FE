import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const AdminSidebar = () => {
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  console.log('User in Redux:', user);

  // Tự động chuyển hướng nếu là admin và không ở trang admin-dashboard

  const navItems = [
    { name: 'Dashboard', path: '/admin-dashboard' },
    { name: 'Quản lý người dùng', path: '/admin/users' },
    { name: 'Quản lý phim', path: '/admin/movies' },
    { name: 'Quản lý lịch chiếu', path: '/admin/schedules' },
    { name: 'Báo cáo', path: '/admin/reports' },
  ];

  return (
    <div className='h-screen w-64 bg-base-200 shadow-md fixed left-0 top-0 p-4'>
      <h2 className='text-2xl font-bold mb-6 text-center'>🎬 Admin Panel</h2>
      <ul className='menu p-0'>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
