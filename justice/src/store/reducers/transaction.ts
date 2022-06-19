import {TransactionAction, TransactionActionTypes} from "../../types/transaction";

const initialState = {
  transaction: []
};

export const transactionReducer = (state = initialState, action: TransactionAction) => {
  switch (action.type) {
    case TransactionActionTypes.CREATE_TRANSACTION:
      return {
        ...state,
        transaction: action.payload
      }
    default: {
      return state;
    }
  }
};