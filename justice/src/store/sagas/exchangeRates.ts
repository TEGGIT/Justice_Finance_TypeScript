import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {SetExchangeRates} from "../action-creators/exchangeRates";
import {ExchangeRatesTypes} from "../../types/exchangeRates";

export function* exchangeRatesWorker() {
  try {
    const {data} = yield call(axios.get, "http://localhost:5000/api/exchangeRates")
    yield put(SetExchangeRates(data[0].exchangeRates))

  } catch (e) {
    console.error(e)
  }
}

export function* exchangeRatesWatcher() {
  yield takeEvery(ExchangeRatesTypes.EXCHANGE_RATES_GET, exchangeRatesWorker)

}