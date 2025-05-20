// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './modules/Home/page/HomePage';

import LayoutUser from './modules/layouts/layoutUser/LayoutUser';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <LayoutUser>
              <HomePage />
            </LayoutUser>
          }
        />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
