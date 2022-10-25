import { applyMiddleware, compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import { rootsReducers, rootsSaga } from "./roots";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
  rootsReducers,
  // persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

// then run the saga
sagaMiddleware.run(rootsSaga);
