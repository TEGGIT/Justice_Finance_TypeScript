import {WalletActionTypes, WalletAction} from "../../types/createWallet";
import {WalletsType} from "../reducers/WalletsReducer";

// TODO Пофиксить типы


export const createWalletUser = (payload: WalletAction[]) => {
  return {
    type: WalletActionTypes.CREATE_NEW_WALLET,
    payload: payload
  }
}