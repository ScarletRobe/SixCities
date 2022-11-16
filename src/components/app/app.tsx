import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import FavoritesPage from '../../pages/favorites/FavoritesPage';
import LoginPage from '../../pages/login/LoginPage';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import PropertyPage from '../../pages/property/PropertyPage';
import { Offer } from '../../types/offer';
import PrivateRoute from '../private-route/PrivateRoute';

type AppProps = {
  offersCount: number;
  offers: Offer[];
}


function App({offersCount, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              offersCount={offersCount}
              offers={offers}
            />
          }
        />

        <Route path={AppRoute.Login} element={<LoginPage />} />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.Place} element={<PropertyPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
