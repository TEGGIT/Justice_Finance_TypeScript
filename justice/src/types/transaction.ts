import {CurrencyType} from "./currency";

export enum TransactionActionTypes {
  CREATE_TRANSACTION = "CREATE_TRANSACTION",
}


export type TransactionType = { get: CurrencyType | undefined; Hour: number; Minutes: number; give: CurrencyType | undefined; giveValue: number | undefined; getValue: number | undefined; }



interface TransactionUserAction {
  type: TransactionActionTypes.CREATE_TRANSACTION;
  payload: [
    {
      get: CurrencyType,
      Hour: string,
      Minutes: string,
      give: CurrencyType,
      giveValue: string,
      getValue: string,
    }
  ];
}

export type TransactionAction = TransactionUserAction