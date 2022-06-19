import {CurrencyType} from "./currency";

export enum WalletActionTypes {
  CREATE_NEW_WALLET = "CREATE_NEW_WALLET",
}

export type CreateWalletType = { currency: CurrencyType | undefined; purseNumber: number | undefined; sum: number }

interface CreateWalletAction {
  type: WalletActionTypes.CREATE_NEW_WALLET;
  payload: CreateWalletType[];
}

export type WalletAction = CreateWalletAction