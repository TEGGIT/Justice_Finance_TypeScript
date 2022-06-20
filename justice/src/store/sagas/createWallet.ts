import {WalletsAction} from "../../types/wallets";
import {call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";
import {WalletActionTypes} from "../../types/createWallet";

export function* createWalletWorker(wallet: WalletsAction) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/wallets/create"), {
        wallets: wallet?.payload
      },
      {
        headers: {
          Authorization: `${Cookies.get("TOKEN")}`,
        },
      }
    )
  } catch (e) {
    console.log(e)
  }
}

export function* createWalletWatcher() {
  yield takeEvery(WalletActionTypes.CREATE_NEW_WALLET, createWalletWorker)
}