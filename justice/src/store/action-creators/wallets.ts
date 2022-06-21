import {WalletsActionTypes} from "../../types/wallets";

import {WalletsType} from "../reducers/WalletsReducer";

export const FetchWallets = () => {
  return {
    type: WalletsActionTypes.FETCH_WALLETS_SUCCESS,
  }
}

export const SetWallets = (payload: WalletsType) => {
  return {
    type: WalletsActionTypes.SET_WALLETS_SUCCESS,
    payload
  }
}
