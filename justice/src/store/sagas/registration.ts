import {RegistrationAction, RegistrationActionType} from "../../types/registration";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {CreateUserError} from "../action-creators/registration";

export function* registrationWorker(user: RegistrationAction) {
  try {
    yield call(axios.post, ("http://localhost:5000/api/auth/register-page"), {
      name: user.payload?.name,
      email: user.payload?.email,
      password: user.payload?.password,
    })
    yield put(CreateUserError(false))

  } catch (e) {
    yield put(CreateUserError(true))

  }
}

export function* registrationWatcher() {
  yield takeEvery(RegistrationActionType.CREATE_USER_SUCCESS, registrationWorker)
}