import {WalletsType} from "../store/reducers/WalletsReducer";
import {CurrencyType} from "./currency";

export enum WalletActionTypes {
  CREATE_NEW_WALLET = "CREATE_NEW_WALLET",
}

type CreateWalletType = {
  currency: CurrencyType;
  purseNumber: number;
  sum: number;
}

interface CreateWalletAction {
  type: WalletActionTypes.CREATE_NEW_WALLET;
  payload: CreateWalletType[];
}

export type WalletAction = CreateWalletAction