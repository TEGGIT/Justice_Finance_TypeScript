import {WalletsType} from "../store/reducers/WalletsReducer";

export enum WalletActionTypes {
  CREATE_NEW_WALLET = "CREATE_NEW_WALLET",
}

interface CreateWalletAction {
  type: WalletActionTypes.CREATE_NEW_WALLET;
  payload: WalletsType;
}

export type WalletAction = CreateWalletAction