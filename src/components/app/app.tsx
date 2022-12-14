import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks/redux';
import FavoritesPage from '../../pages/favorites/FavoritesPage';
import LoadingPage from '../../pages/loading-page/LoadingPage';
import LoginPage from '../../pages/login/LoginPage';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import PropertyPage from '../../pages/property-page/PropertyPage';
import PrivateRoute from '../private-route/PrivateRoute';
import ScrollToTop from '../scroll-to-top/ScrollToTop';

function App (): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.rootReducer.userData.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {return <LoadingPage />;}

  return (
    <HashRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage />
          }
        />

        <Route path={AppRoute.Login} element={<LoginPage />} />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.Place}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <React.Fragment>
                <ScrollToTop />
                <PropertyPage />
              </React.Fragment>
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
