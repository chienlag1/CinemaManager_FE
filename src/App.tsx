// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './modules/Home/page/HomePage';

import LayoutUser from './modules/layouts/layoutUser/LayoutUser';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import SyncClerkUser from './services/SyncClerkUser';
import MoviePage from './modules/movie/pages/MoviePage';

function App() {
  return (
    <BrowserRouter>
      <SyncClerkUser />
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
        <Route
          path='/movies'
          element={
            <LayoutUser>
              <MoviePage />
            </LayoutUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
