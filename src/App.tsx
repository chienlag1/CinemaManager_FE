// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './modules/Home/page/HomePage';

import LayoutUser from './modules/layouts/layoutUser/LayoutUser';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import AdminDashboard from './modules/admin/page/AdminDashboard';
import LayoutAdmin from './modules/layouts/layoutAdmin/LayoutAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/'
          element={
            <LayoutUser>
              <HomePage />
            </LayoutUser>
          }
        />
        <Route
          path='/admin-dashboard'
          element={
            <LayoutAdmin>
              <AdminDashboard />
            </LayoutAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
