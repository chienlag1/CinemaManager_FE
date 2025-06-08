import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './modules/Home/page/HomePage';
import LayoutUser from './modules/layouts/layoutUser/LayoutUser';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import MoviePage from './modules/movie/pages/MoviePage';
import ProtectedRoute from './modules/layouts/ProtectedRoute';
import AdminDashboardPage from './modules/admin/pages/AdminDashboard';
import LayoutAdmin from './modules/layouts/layoutAdmin/LayoutAdmin';
import MovieManagementPage from './modules/admin/components/MovieManagement/MovieManagementPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
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

        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LayoutAdmin>
                {' '}
                <AdminDashboardPage />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/movies'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LayoutAdmin>
                {' '}
                <MovieManagementPage />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
