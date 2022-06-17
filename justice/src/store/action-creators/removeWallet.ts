import {RemoveWalletActionTypes, RemoveWalletType} from "../../types/removeWallet";


//TODO пофиксить
export const removeWalletUser = (payload: RemoveWalletType) => {
  return {
    type: RemoveWalletActionTypes.REMOVE_WALLETS,
    payload
  }
};