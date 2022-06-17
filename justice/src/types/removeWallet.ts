export enum RemoveWalletActionTypes {
  REMOVE_WALLETS = "REMOVE_WALLETS"
}

interface RemoveWalletUserAction {
  type: RemoveWalletActionTypes.REMOVE_WALLETS;
  payload: [];
}

export type RemoveWalletType =
  | RemoveWalletUserAction