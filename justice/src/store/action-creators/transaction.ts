import {TransactionActionTypes, TransactionAction} from "../../types/transaction";


export const transactionUser = (payload: TransactionAction) => {
  return {
    type: TransactionActionTypes.CREATE_TRANSACTION,
    payload: payload
  }
}