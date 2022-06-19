import {WalletActionTypes, CreateWalletType} from "../../types/createWallet";

// TODO Пофиксить типы


export const createWalletUser = (payload: CreateWalletType) => {
  return {
    type: WalletActionTypes.CREATE_NEW_WALLET,
    payload: payload
  }
}