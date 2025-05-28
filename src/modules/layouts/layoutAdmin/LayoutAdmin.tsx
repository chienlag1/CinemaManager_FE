import type { ReactNode } from 'react';
import AdminSidebar from '../../../components/admin/sideBarAdmin';

interface LayoutUserProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutUserProps) {
  // your layout logic
  return (
    <div>
      <AdminSidebar />
      {children}
    </div>
  );
}

export default LayoutAdmin;
