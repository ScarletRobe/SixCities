import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Favorites from '../../pages/favorites/FavoritesPage';
import LoginPage from '../../pages/login/LoginPage';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import PropertyPage from '../../pages/property/PropertyPage';

type AppProps = {
  offersCount: number;
}


function App({offersCount}: AppProps): JSX.Element {
  const [auth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offersCount={offersCount}/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            auth ? <Favorites /> : <Navigate to={'/login'} replace/>
          }
        />
        <Route path={AppRoute.Room} element={<PropertyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
