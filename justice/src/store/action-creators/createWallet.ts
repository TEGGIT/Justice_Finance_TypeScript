import {WalletActionTypes, CreateWalletType} from "../../types/createWallet";



export const createWalletUser = (payload: CreateWalletType[]) => {
  return {
    type: WalletActionTypes.CREATE_NEW_WALLET,
    payload: payload
  }
}