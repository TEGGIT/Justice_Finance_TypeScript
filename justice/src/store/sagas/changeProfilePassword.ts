import {ChangeProfilePasswordActionTypes, ChangeProfilePasswordType} from "../../types/changeProfilePassword";
import {call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

export function* changeProfilePasswordWorker(user: ChangeProfilePasswordType) {
  try {
    yield call(axios.patch, ("http://localhost:5001/api/profile/changePassword"), {
      password: user.payload?.password,
      newPassword: user.payload?.newPassword
    }, {
      headers: {Authorization: `${Cookies.get("TOKEN")}`},
    })
  } catch (e) {
    console.log(e)
  }
}

export function* changeProfilePasswordWatcher() {
  yield takeEvery(ChangeProfilePasswordActionTypes.CHANGE_PROFILE_PASSWORD_SET, changeProfilePasswordWorker)

}