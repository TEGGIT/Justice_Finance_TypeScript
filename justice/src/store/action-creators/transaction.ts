import {TransactionActionTypes, TransactionType} from "../../types/transaction";


export const transactionUser = (payload: TransactionType[]) => {
  return {
    type: TransactionActionTypes.CREATE_TRANSACTION,
    payload: payload
  }
}