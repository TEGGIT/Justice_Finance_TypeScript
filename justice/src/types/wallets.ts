export interface WalletsState {
  wallets: any[];
  loading: boolean;
  error: null | string;

}

export enum WalletsActionTypes {
  FETCH_WALLETS = 'FETCH_WALLETS',
  FETCH_WALLETS_SUCCESS = 'FETCH_WALLETS_SUCCESS',
  FETCH_WALLETS_ERROR = 'FETCH_WALLETS_ERROR'
}

interface FetchWalletsAction {
  type: WalletsActionTypes.FETCH_WALLETS
}

interface FetchWalletsSuccessAction {
  type: WalletsActionTypes.FETCH_WALLETS_SUCCESS
  payload: any[];
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