import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

import styles from './styles.css';
import sliderStyle from './slider.css';
import loaderStyle from './loader.css';

import App from './App';

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App style={(styles, sliderStyle, loaderStyle)} />
      </Router>
    </Provider>
  );
}
