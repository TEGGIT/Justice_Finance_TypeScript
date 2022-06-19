import {WalletsType} from "../store/reducers/WalletsReducer";

export enum UpdateWalletActionTypes {
  UPDATE_WALLETS = "UPDATE_WALLETS"
}

interface UpdateWalletUserAction {
  type: UpdateWalletActionTypes.UPDATE_WALLETS;
  payload: WalletsType;
}

export type UpdateWalletType =
  | UpdateWalletUserAction