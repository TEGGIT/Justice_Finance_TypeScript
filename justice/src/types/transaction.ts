export enum TransactionActionTypes {
  CREATE_TRANSACTION = "CREATE_TRANSACTION",
}

interface TransactionUserAction {
  type: TransactionActionTypes.CREATE_TRANSACTION;
  payload: [
    {
      get: string,
      Hour: string,
      Minutes: string,
      give: string,
      giveValue: string,
      getValue: string,
    }
  ];
}

export type TransactionAction = TransactionUserAction