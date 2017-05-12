import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import rootReducer from '../reducer';

const logger = createLogger();

const middlewares = [promiseMiddleware, logger, require('redux-immutable-state-invariant')()];

const enhancer = compose(
  applyMiddleware(...middlewares)
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // Enable hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
