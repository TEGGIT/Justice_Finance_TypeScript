import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";
import {SetWallets} from "../action-creators/wallets";
import {WalletsActionTypes} from "../../types/wallets";

export function* walletsDataWorker() {
  try {
    const {data} = yield call(axios.get, "http://localhost:5001/api/wallets", {
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