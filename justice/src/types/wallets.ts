import {CurrencyType} from "../components/PursePage/PursePage";

export enum WalletsActionTypes {
  FETCH_WALLETS = 'FETCH_WALLETS',
  FETCH_WALLETS_SUCCESS = 'FETCH_WALLETS_SUCCESS',
  FETCH_WALLETS_ERROR = 'FETCH_WALLETS_ERROR'
}

interface FetchWalletsAction {
  type: WalletsActionTypes.FETCH_WALLETS
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

interface FetchWalletsErrorAction {
  type: WalletsActionTypes.FETCH_WALLETS_ERROR
  payload: string
}

export type WalletsAction =
  FetchWalletsAction
  |
  FetchWalletsErrorAction
  |
  FetchWalletsSuccessAction