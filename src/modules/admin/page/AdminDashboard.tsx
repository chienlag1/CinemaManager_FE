import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('user:', user);
    console.log('role:', user?.publicMetadata?.role);
  }, [user]);

  useEffect(() => {
    if (user?.publicMetadata?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      {/* Nội dung admin dashboard */}
    </div>
  );
};

export default AdminDashboard;
