import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { offers } from './mocks/offers';
import { store } from './store/store';

const Settings = {
  offersCount: 312,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={offers}
        offersCount={Settings.offersCount}
        reviews={comments}
      />
    </Provider>
  </React.StrictMode>,
);
