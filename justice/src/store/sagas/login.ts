import {LoginAction, LoginActionType} from "../../types/login";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";
import {AuthUserError} from "../action-creators/login";

export function* loginWorker(user: LoginAction) {
  try {
    const {data} = yield call(axios.post, ("http://localhost:5000/api/auth/login-page"), {
      email: user.payload?.email,
      password: user.payload?.password
    })
    Cookies.set("TOKEN", data.token)
    yield put(AuthUserError(false))
  } catch (e) {
    yield put(AuthUserError(true))

  }

}

export function* loginWatcher() {
  yield takeEvery(LoginActionType.LOGIN_USER_SUCCESS, loginWorker)
}