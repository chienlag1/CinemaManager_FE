import AdminSidebar from '../../../components/admin/sideBar';

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='ml-64 p-6 w-full'>{children}</div>
    </div>
  );
};

export default LayoutAdmin;
