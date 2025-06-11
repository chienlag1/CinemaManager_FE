import type { ReactNode } from 'react';
import AdminSidebar from '../../../components/admin/sideBarAdmin'; // Đảm bảo đường dẫn này đúng

interface LayoutAdminProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <div className='flex h-screen'>
      {' '}
      {/* Sử dụng flexbox để sidebar và nội dung nằm cạnh nhau */}
      <AdminSidebar /> {/* Sidebar dọc của bạn */}
      <main className='flex-1 overflow-auto'>
        {/* Phần nội dung chính, chiếm hết không gian còn lại */}
        {children}
      </main>
    </div>
  );
}

export default LayoutAdmin;
