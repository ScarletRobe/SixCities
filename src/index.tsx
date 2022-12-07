import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { checkAuth, fetchOffers } from './store/apiActions';
import { store } from './store/store';

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        reviews={comments}
      />
    </Provider>
  </React.StrictMode>,
);
