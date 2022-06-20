import {RemoveWalletActionTypes, RemoveWalletType} from "../../types/removeWallet";
import {call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

export function* removeWalletWorker(removeWallet: RemoveWalletType) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/wallets/remove"), {
        wallets: removeWallet?.payload,
      },
      {
        headers: {Authorization: `${Cookies.get("TOKEN")}`},
      }
    )
  } catch (e) {
    console.log(e)
  }
}

export function* removeWalletWatcher() {
  yield takeEvery(RemoveWalletActionTypes.REMOVE_WALLETS, removeWalletWorker)
}