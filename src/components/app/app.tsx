import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import FavoritesPage from '../../pages/favorites/FavoritesPage';
import LoginPage from '../../pages/login/LoginPage';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import PropertyPage from '../../pages/property/PropertyPage';
import PrivateRoute from '../private-route/PrivateRoute';

type AppProps = {
  offersCount: number;
}


function App({offersCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offersCount={offersCount}/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room} element={<PropertyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
