import { createStore, compose, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { default as reduxThunk } from 'redux-thunk';

import rootReducer from './rootReducer';
import api from '../api/apiInterceptor';

const persistConfig = {
  key: 'learnNewWordStoreKey',
  storage,
  stateReconciler: autoMergeLevel1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  reduxThunk.withExtraArgument({ api }),
  reduxPackMiddleware
];

const storeEnhancers = [
  applyMiddleware(...middlewares)
];

export default (initialState) => (onComplete) => {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(...storeEnhancers)
  );
  const storePersisted = persistStore(store, null, onComplete);
  return { storePersisted, store };
};
