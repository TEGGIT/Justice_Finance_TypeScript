import {applyMiddleware, legacy_createStore as createStore, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware, {Saga} from 'redux-saga'

import {rootReducer} from "./reducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(saga)))

saga.run(<Saga>(rootSaga))