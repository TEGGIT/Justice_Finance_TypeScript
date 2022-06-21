import {UpdateWalletActionTypes} from "../../types/updateWallet";
import {WalletsType} from "../reducers/WalletsReducer";




export const updateWalletUser = (payload: WalletsType[]) => {
  return {
    type: UpdateWalletActionTypes.UPDATE_WALLETS,
    payload
  }
};