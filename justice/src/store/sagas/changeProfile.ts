import {ChangeProfileActionTypes, ChangeProfileType} from "../../types/changeProfile";
import {call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

export function* changeProfileWorker(user: ChangeProfileType) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/profile"), {
        name: user.payload?.name,
        email: user.payload?.email,
        city: user.payload?.city,
        birthday: user.payload?.birthday,
        phoneNumber: user.payload?.phoneNumber

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

  yield takeEvery(ChangeProfileActionTypes.CHANGE_PROFILE_SET, changeProfileWorker)
}