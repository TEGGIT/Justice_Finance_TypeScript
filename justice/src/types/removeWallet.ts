import {WalletsType} from "../store/reducers/WalletsReducer";

export enum RemoveWalletActionTypes {
  REMOVE_WALLETS = "REMOVE_WALLETS"
}

interface RemoveWalletUserAction {
  type: RemoveWalletActionTypes.REMOVE_WALLETS;
  payload: WalletsType;
}

export type RemoveWalletType =
  | RemoveWalletUserAction