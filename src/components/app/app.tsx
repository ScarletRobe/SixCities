import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import FavoritesPage from '../../pages/favorites/FavoritesPage';
import LoginPage from '../../pages/login/LoginPage';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import PropertyPage from '../../pages/property-page/PropertyPage';
import { Comment } from '../../types/comment';
import PrivateRoute from '../private-route/PrivateRoute';
import ScrollToTop from '../scrollToTop/ScrollToTop';

type AppProps = {
  reviews: Comment[];
}


function App ({reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.Place}
          element={
            <React.Fragment>
              <ScrollToTop />
              <PropertyPage
                reviews={reviews}
              />
            </React.Fragment>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
