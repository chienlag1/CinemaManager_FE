import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './modules/user/Home/page/HomePage';
import LayoutUser from './modules/layouts/layoutUser/LayoutUser';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import ProtectedRoute from './modules/layouts/ProtectedRoute';
import AdminDashboardPage from './modules/admin/pages/AdminDashboard';
import LayoutAdmin from './modules/layouts/layoutAdmin/LayoutAdmin';
import MovieManagementPage from './modules/admin/components/MovieManagement/pages/MovieManagementPage';
import MoviePage from './modules/user/movie/pages/MoviePage';
import RoomManagementPage from './modules/admin/components/RoomManagement/pages/RoomManagementPage';
import ShowtimeManagementPage from './modules/admin/components/ShowTimeManagement/pages/ShowTimeManagementPage';
import PaymentResultPage from './modules/user/payment/pages/PaymentSuccessPage';
import BookingPage from './modules/user/payment/pages/BookingTicketPage';
import PaymentSuccessPage from './modules/user/payment/pages/PaymentSuccessPage';
import PaymentFailurePage from './modules/user/payment/pages/PaymentFailurePage';

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
                <MovieManagementPage />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/rooms'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LayoutAdmin>
                <RoomManagementPage />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/showtimes'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LayoutAdmin>
                <ShowtimeManagementPage />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />

        {/* Booking route */}
        <Route
          path='/booking/:movieId'
          element={
            <ProtectedRoute>
              <LayoutUser>
                <BookingPage />
              </LayoutUser>
            </ProtectedRoute>
          }
        />

        <Route
          path='/payment-success'
          element={
            <ProtectedRoute>
              <LayoutUser>
                <PaymentSuccessPage />
              </LayoutUser>
            </ProtectedRoute>
          }
        />

        {/* ✅ Trang kết quả thanh toán thất bại (PayOS redirect) */}
        <Route
          path='/payment-cancel'
          element={
            <ProtectedRoute>
              <LayoutUser>
                <PaymentFailurePage />
              </LayoutUser>
            </ProtectedRoute>
          }
        />

        {/* Keep your existing payment result route for backward compatibility */}
        <Route
          path='/payment-result/:ticketId'
          element={
            <ProtectedRoute>
              <LayoutUser>
                <PaymentResultPage />
              </LayoutUser>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
