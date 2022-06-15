import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware, {Saga} from 'redux-saga'

import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware()


export const store = createStore(rootReducer, applyMiddleware(thunk, saga))

saga.run(<Saga>(rootSaga))