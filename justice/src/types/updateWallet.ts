export enum UpdateWalletActionTypes {
  UPDATE_WALLETS = "UPDATE_WALLETS"
}

interface UpdateWalletUserAction {
  type: UpdateWalletActionTypes.UPDATE_WALLETS;
  payload: [];
}

export type UpdateWalletType =
  | UpdateWalletUserAction