/* eslint-disable no-sequences */
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import Root from './Root';

import storage from './utils/storage';
import { configureClient } from './api/client';

import configureStore from './store';

const accessToken = storage.get('auth');
configureClient({ accessToken });
const history = createBrowserHistory();

const store = configureStore({
  preloadedState: {
    auth: { logged: !!accessToken, user: null, id: null },
    adverts: { loaded: false, data: [] },
  },
  history,
});

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
