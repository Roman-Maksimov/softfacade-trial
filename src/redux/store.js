import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';
import createdReducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const reducers = combineReducers({
  ...createdReducers,
});

const store = createStore(reducers, middlewares);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

const spawnFunc = function* () {
  // eslint-disable-next-line no-restricted-syntax
  for (const saga of sagas) {
    yield spawn(saga);
  }
};

sagaMiddleware.run(spawnFunc);

export default store;
