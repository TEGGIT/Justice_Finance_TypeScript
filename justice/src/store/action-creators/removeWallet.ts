import {RemoveWalletActionTypes} from "../../types/removeWallet";
import {WalletsType} from "../reducers/WalletsReducer";


export const removeWalletUser = (payload: WalletsType[] | undefined) => {
  return {
    type: RemoveWalletActionTypes.REMOVE_WALLETS,
    payload
  }
};