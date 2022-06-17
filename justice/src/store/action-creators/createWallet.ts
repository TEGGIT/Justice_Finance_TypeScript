import {WalletActionTypes, WalletAction} from "../../types/createWallet";
import {WalletsType} from "../reducers/WalletsReducer";

// TODO Пофиксить типы
export const createWalletUser = (payload: (WalletsType | { currency: "USD" | "TRY" | "EUR" | "CNY" | "RUB" | undefined; purseNumber: number | undefined; sum: number })[]) => {
  return {
    type: WalletActionTypes.CREATE_NEW_WALLET,
    payload: payload
  }
}