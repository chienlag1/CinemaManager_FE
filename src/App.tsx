// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import các component/pages của bạn
import HomePage from './modules/Home/page/HomePage';
import LayoutUser from './modules/layouts/layoutUser/LayoutUser';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import MoviePage from './modules/movie/pages/MoviePage';
import ProtectedRoute from './modules/layouts/ProtectedRoute';
import AdminDashboardPage from './modules/admin/pages/AdminDashboard';
import LayoutAdmin from './modules/layouts/layoutAdmin/LayoutAdmin';

// --- Hết các import mới ---

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Không cần đăng nhập */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <LayoutUser>
                <HomePage />
              </LayoutUser>
            </ProtectedRoute>
          }
        />
        <Route
          path='/movies'
          element={
            <ProtectedRoute>
              <LayoutUser>
                <MoviePage />
              </LayoutUser>
            </ProtectedRoute>
          }
        />
        {/* Routes chỉ dành cho ADMIN.
          Bọc bằng ProtectedRoute và truyền allowedRoles={['admin']}.
        */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              {/* Đây là component trang admin của bạn */}
              <LayoutAdmin>
                {' '}
                <AdminDashboardPage />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
        {/* Redirect các đường dẫn không xác định về trang chủ */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
