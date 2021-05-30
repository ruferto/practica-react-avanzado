import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as api from '../api';

const configureStore = ({ preloadedState, history }) => {
  const middleware = [
    routerMiddleware(history),
    thunk.withExtraArgument({ api, history }),
  ];
  const store = createStore(
    combineReducers({ ...reducers, router: connectRouter(history) }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
};

export default configureStore;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
