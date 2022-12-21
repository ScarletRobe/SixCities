import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { checkAuth, fetchFavorites, fetchOffers } from './store/apiActions';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuth());
store.dispatch(fetchOffers());
store.dispatch(fetchFavorites());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-center"
      />
      <App />
    </Provider>
  </React.StrictMode>,
);
