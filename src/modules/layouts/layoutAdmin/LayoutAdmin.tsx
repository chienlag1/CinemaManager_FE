import type { ReactNode } from 'react';
import SidebarAdmin from '../../../components/admin/sidebarAdmin';

interface LayoutUserProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutUserProps) {
  // your layout logic
  return (
    <div>
      <SidebarAdmin />
      {children}
    </div>
  );
}

export default LayoutAdmin;
