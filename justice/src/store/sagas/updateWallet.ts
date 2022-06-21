import {UpdateWalletActionTypes, UpdateWalletType} from "../../types/updateWallet";
import {call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

export function* updateWalletWorker(updateWallet: UpdateWalletType) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/wallets/update"), {
        wallets: updateWallet?.payload,
      },
      {
        headers: {Authorization: `${Cookies.get("TOKEN")}`},
      }
    )
  } catch (e) {
    console.log(e)
  }
}

export function* updateWalletWatcher() {
  yield takeEvery(UpdateWalletActionTypes.UPDATE_WALLETS, updateWalletWorker)

}