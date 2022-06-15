import {put, takeEvery, call, all, take} from 'redux-saga/effects'
import axios from "axios";
import Cookies from "js-cookie";
import {FetchUser} from "../action-creators/user";
import {UsersActionTypes} from "../../types/user";

export function* userDataWorker() {
    //@ts-ignore
    const {data} = yield axios.get("http://localhost:5000/api/wallets", {
        headers: {Authorization: `${Cookies.get("TOKEN")}`}
    })
    try {
        // @ts-ignore
        yield put(FetchUser(data))
    } catch (e) {
        console.error(e)
    }
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
