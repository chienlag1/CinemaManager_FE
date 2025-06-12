import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-base-300 text-base-content font-sans'>
      {/* Main Content Area */}
      <main className='container mx-auto px-4 py-16'>
        {/* Hero Section - Tương tự như hình ảnh */}
        <section className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-4 text-primary'>
            Chào mừng đến Cinema Manager
          </h1>
          <p className='text-xl'>
            Quản lý rạp chiếu phim một cách dễ dàng và hiệu quả!
          </p>
        </section>

        {/* Feature Cards - Mô phỏng các khối chức năng */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
          {/* Quản lý vé phim (MovieTicket) */}
          <div className='card bg-base-200 shadow-xl p-8'>
            <h2 className='text-2xl font-semibold mb-3 text-primary'>
              Quản lý vé phim
            </h2>
            <p className='text-lg mb-4'>
              Thêm, chỉnh sửa, xóa và xem chi tiết các vé phim.
            </p>
            <div className='card-actions justify-end'>
              <Link to='/admin/tickets' className='btn btn-primary'>
                Đi đến Quản lý Vé
              </Link>
            </div>
          </div>

          {/* Quản lý suất chiếu */}
          <div className='card bg-base-200 shadow-xl p-8'>
            <h2 className='text-2xl font-semibold mb-3 text-primary'>
              Quản lý suất chiếu
            </h2>
            <p className='text-lg mb-4'>
              Thêm, chỉnh sửa lịch chiếu và phim dễ dàng.
            </p>
            <div className='card-actions justify-end'>
              <Link to='/admin/showtimes' className='btn btn-primary'>
                Đi đến Quản lý Suất Chiếu
              </Link>
            </div>
          </div>

          {/* Bạn có thể thêm các card quản lý khác ở đây, ví dụ: Quản lý Phim, Quản lý Người dùng */}
          <div className='card bg-base-200 shadow-xl p-8'>
            <h2 className='text-2xl font-semibold mb-3 text-primary'>
              Quản lý Phim
            </h2>
            <p className='text-lg mb-4'>
              Thêm, sửa, xóa phim và cập nhật thông tin.
            </p>
            <div className='card-actions justify-end'>
              <Link to='/admin/movies' className='btn btn-primary'>
                Đi đến Quản lý Phim
              </Link>
            </div>
          </div>

          <div className='card bg-base-200 shadow-xl p-8'>
            <h2 className='text-2xl font-semibold mb-3 text-primary'>
              Quản lý Người dùng
            </h2>
            <p className='text-lg mb-4'>
              Xem, chỉnh sửa vai trò và quản lý tài khoản người dùng.
            </p>
            <div className='card-actions justify-end'>
              <Link to='/admin/users' className='btn btn-primary'>
                Đi đến Quản lý Người dùng
              </Link>
            </div>
          </div>
        </section>

        {/* Thông tin và hỗ trợ - Tương tự như hình ảnh */}
      </main>

      {/* Footer - Tương tự như hình ảnh */}
      <footer className='footer footer-center p-4 bg-base-100 text-base-content'>
        <div>
          <p>
            © 2025 Bản quyền thuộc về{' '}
            <span className='text-primary'>CineApp</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboardPage;
