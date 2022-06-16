import {put, takeEvery, call, all} from 'redux-saga/effects'
import axios from "axios";
import Cookies from "js-cookie";
import {SetUsers} from "../action-creators/user";
import {UsersActionTypes} from "../../types/user";
import {SetWallets} from "../action-creators/wallets";
import {WalletsActionTypes} from "../../types/wallets";
import {SetExchangeRates} from "../action-creators/exchangeRates";
import {ExchangeRatesTypes} from "../../types/exchangeRates";
import {RegistrationActionType} from "../../types/registration";


export function* registrationWorker(user: {payload: {name: string, email: string, password: string}}) {
  try {
    axios.post("http://localhost:5000/api/auth/register-page", {
      name: user.payload.name,
      email: user.payload.email,
      password: user.payload.password,
    }).then()
    console.log(user.payload)
  } catch (e) {
    console.error(e)
  }
}


export function* registrationWatcher() {
  // @ts-ignore
  yield takeEvery(RegistrationActionType.CREATE_USER_SUCCESS, registrationWorker)
}


export function* exchangeRatesWorker() {
  try {
    const {data} = yield call(axios.get, "http://localhost:5000/api/exchangeRates")
    console.log(data[0].exchangeRates)
    yield put(SetExchangeRates(data[0].exchangeRates))

  } catch (e) {
    console.error(e)
  }
}

export function* exchangeRatesWatcher() {
  yield takeEvery(ExchangeRatesTypes.EXCHANGE_RATES_GET, exchangeRatesWorker)

}


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
  yield all([userDataWatcher(), walletsDataWatcher(), exchangeRatesWatcher(), registrationWatcher()])
}


