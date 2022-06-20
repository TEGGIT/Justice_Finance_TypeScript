import {TransactionAction, TransactionActionTypes} from "../../types/transaction";
import {call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

export function* transactionWorker(transaction: TransactionAction) {
  try {
    yield call(axios.patch, ("http://localhost:5000/api/transaction"), {
        transaction: transaction?.payload
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