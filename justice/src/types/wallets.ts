import {CurrencyType} from "./currency";

export enum WalletsActionTypes {
  FETCH_WALLETS_SUCCESS = 'FETCH_WALLETS_SUCCESS',
  SET_WALLETS_SUCCESS = 'SET_WALLETS_SUCCESS'
}

type WalletType = {
  currency: CurrencyType,
  purseNumber: number,
  sum: number,
}

interface FetchWalletsSuccessAction {
  type: WalletsActionTypes.FETCH_WALLETS_SUCCESS
  payload: WalletType[];
}

interface SetWalletsSuccessAction {
  type: WalletsActionTypes.SET_WALLETS_SUCCESS
  payload: WalletType[]
}

export type WalletsAction =
  FetchWalletsSuccessAction
  |
  SetWalletsSuccessAction