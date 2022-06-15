import {put, takeEvery, call, all, take} from 'redux-saga/effects'
import axios from "axios";
import Cookies from "js-cookie";
import {FetchUser} from "../action-creators/user";
import {UsersActionTypes} from "../../types/user";


async function userDataApi() {
  return await axios.get("http://localhost:5000/api/wallets", {
    headers: {
      Authorization: `${Cookies.get("TOKEN")}`,
    },
  }).then(res => ())
}

export function* userDataWorker() {
  const {res} = yield userDataApi()
  console.log(res.data)
  // @ts-ignore
  yield put(FetchUser(res.data))
}

export function* userDataWatcher() {
  yield takeEvery(UsersActionTypes.FETCH_USERS_SUCCESS, userDataWorker)
}


export default function* rootSaga() {
  yield all([userDataWatcher()])
}

async function* test() {
  // const response = await axios.get("http://localhost:5000/api/wallets", {
  //   headers: {
  //     Authorization: `${Cookies.get("TOKEN")}`,
  //   },
  // });
  // yield put(FetchUser(response.data))

}
