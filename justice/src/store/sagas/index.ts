import {all} from 'redux-saga/effects'

import {removeWalletWatcher} from "./removeWallet";
import {updateWalletWatcher} from "./updateWallet";
import {transactionWatcher} from "./transaction";
import {createWalletWatcher} from "./createWallet";
import {changeProfilePasswordWatcher} from "./changeProfilePassword";
import {changeProfileWatcher} from "./changeProfile";
import {loginWatcher} from "./login";
import {registrationWatcher} from "./registration";
import {exchangeRatesWatcher} from "./exchangeRates";
import {walletsDataWatcher} from "./wallets";
import {userDataWatcher} from "./user";

export default function* rootSaga() {
  yield all(
    [
      userDataWatcher(),
      walletsDataWatcher(),
      exchangeRatesWatcher(),
      registrationWatcher(),
      loginWatcher(),
      changeProfileWatcher(),
      changeProfilePasswordWatcher(),
      createWalletWatcher(),
      transactionWatcher(),
      updateWalletWatcher(),
      removeWalletWatcher()
    ])
}


