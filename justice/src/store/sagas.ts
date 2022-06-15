import {takeEvery, put} from 'redux-saga/effects'
import {UsersActionTypes} from "../types/user";


export function* sagaWatcher() {
  // @ts-ignore
  takeEvery(UsersActionTypes.FETCH_USERS, sagaWorker)
}

function* sagaWorker() {
  // yield put()
}