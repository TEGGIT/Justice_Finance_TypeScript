import {UpdateWalletActionTypes, UpdateWalletType} from "../../types/updateWallet";


//TODO пофиксить


export const updateWalletUser = (payload: UpdateWalletType) => {
  return {
    type: UpdateWalletActionTypes.UPDATE_WALLETS,
    payload
  }
};