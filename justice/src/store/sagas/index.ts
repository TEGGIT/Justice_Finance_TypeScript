import {put, takeEvery, call, all} from 'redux-saga/effects'
import axios from "axios";
import Cookies from "js-cookie";
import {SetUsers} from "../action-creators/user";
import {UsersActionTypes} from "../../types/user";
import {SetWallets} from "../action-creators/wallets";
import {WalletsActionTypes} from "../../types/wallets";


export function* walletsDataWorker() {
  try {
    const {data} = yield call(axios.get, "http://localhost:5000/api/wallets", {
      headers: {
        Authorization: `${Cookies.get("TOKEN")}`,
      }
    })
    yield put(SetWallets(data[0].wallets))
  } catch (e) {

  }
}

export function* walletsDataWatcher() {
  yield takeEvery(WalletsActionTypes.FETCH_WALLETS_SUCCESS, walletsDataWorker)
}


export function* userDataWorker() {
  try {
    const {data} = yield call(axios.get, "http://localhost:5000/api/wallets", {
      headers: {
        Authorization: `${Cookies.get("TOKEN")}`,
      }
    })
    yield put(SetUsers(data))
  } catch (e) {
    console.error(e)
  }
}

export function* userDataWatcher() {
  yield takeEvery(UsersActionTypes.FETCH_USERS_SUCCESS, userDataWorker)
}


export default function* rootSaga() {
  yield all([userDataWatcher(), walletsDataWatcher()])
}


