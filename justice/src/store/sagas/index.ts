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
import {CreateUserError} from "../action-creators/registration";
import {LoginActionType} from "../../types/login";
import {AuthUserError} from "../action-creators/login";
import {ChangeProfileActionTypes} from "../../types/changeProfile";
import {Change} from "../action-creators/changeProfile";
import {ChangeProfilePasswordActionTypes} from "../../types/changeProfilePassword";
import {ChangePassword} from "../action-creators/changeProfilePassword";
import {WalletActionTypes} from "../../types/createWallet";
import {WalletsType} from "../reducers/WalletsReducer";
import {TransactionActionTypes} from "../../types/transaction";
import {UpdateWalletActionTypes} from "../../types/updateWallet";
import {RemoveWalletActionTypes} from "../../types/removeWallet";


//TODO пофиксить
export function* removeWalletWorker(removeWallet) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/wallets/remove"), {
        wallets: removeWallet.payload,
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


// TODO пофиксить
export function* updateWalletWorker(updateWallet) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/wallets/update"), {
        wallets: updateWallet.payload,
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

// TODO пофиксить
export function* transactionWorker(transaction) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/transaction"), {
        transaction: transaction.payload
      },
      {headers: {Authorization: `${Cookies.get("TOKEN")}`}}
    )
  } catch (e) {
    console.log(e)
  }
}

export function* transactionWatcher() {
  yield takeEvery(TransactionActionTypes.CREATE_TRANSACTION, transactionWorker)
}

export function* createWalletWorker(wallet: { payload: WalletsType }) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/wallets/create"), {
        wallets: wallet.payload
      },
      {
        headers: {
          Authorization: `${Cookies.get("TOKEN")}`,
        },
      }
    )
    console.log(wallet)
  } catch (e) {
    console.log(e)
  }
}

export function* createWalletWatcher() {
  // @ts-ignore
  // TODO пофиксить
  yield takeEvery(WalletActionTypes.CREATE_NEW_WALLET, createWalletWorker)

}

export function* changeProfilePasswordWorker(user: { payload: ChangePassword }) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/profile/changePassword"), {
      password: user.payload.password,
      newPassword: user.payload.newPassword
    }, {
      headers: {Authorization: `${Cookies.get("TOKEN")}`},
    })
  } catch (e) {
    console.log(e)
  }
}

export function* changeProfilePasswordWatcher() {
  // @ts-ignore
  // TODO пофиксить
  yield takeEvery(ChangeProfilePasswordActionTypes.CHANGE_PROFILE_PASSWORD_SET, changeProfilePasswordWorker)

}

export function* changeProfileWorker(user: { payload: Change }) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/profile"), {
        name: user.payload.name,
        email: user.payload.email,
        city: user.payload.city,
        birthday: user.payload.birthday,
        phoneNumber: user.payload.phoneNumber

      },
      {
        headers: {Authorization: `${Cookies.get("TOKEN")}`},
      }
    )
  } catch (e) {
    console.error(e)
  }
}

export function* changeProfileWatcher() {
  // @ts-ignore
  // TODO пофиксить
  yield takeEvery(ChangeProfileActionTypes.CHANGE_PROFILE_SET, changeProfileWorker)
}

export function* loginWorker(user: { payload: { password: string, email: string } }) {
  try {
    const {data} = yield call(axios.post, ("http://localhost:5000/api/auth/login-page"), {
      email: user.payload.email,
      password: user.payload.password
    })
    Cookies.set("TOKEN", data.token)
    yield put(AuthUserError(false))
  } catch (e) {
    yield put(AuthUserError(true))

  }

}

export function* loginWatcher() {
  // TODO пофиксить
  // @ts-ignore
  yield takeEvery(LoginActionType.LOGIN_USER_SUCCESS, loginWorker)
}


export function* registrationWorker(user: { payload: { name: string, email: string, password: string } }) {
  try {
    yield call(axios.post, ("http://localhost:5000/api/auth/register-page"), {
      name: user.payload.name,
      email: user.payload.email,
      password: user.payload.password,
    })
    yield put(CreateUserError(false))

  } catch (e) {
    yield put(CreateUserError(true))

  }
}


export function* registrationWatcher() {
  // TODO пофиксить
  // @ts-ignore
  yield takeEvery(RegistrationActionType.CREATE_USER_SUCCESS, registrationWorker)
}


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


