import {WalletsAction, WalletsActionTypes} from "../../types/wallets";
import {CurrencyType} from "../../types/currency";

export type WalletsType = {
  currency: CurrencyType;
  purseNumber: number;
  sum: number;
};

export interface WalletsState {
  wallets: WalletsType[];
  loading: boolean;
  error: null | string;
}

const initialState: WalletsState = {
  wallets: [],
  error: null,
  loading: false,
};

export const walletsReducer = (
  state = initialState,
  action: WalletsAction
): WalletsState => {
  switch (action.type) {
    case WalletsActionTypes.FETCH_WALLETS:
      return {...state, loading: true};
    case WalletsActionTypes.FETCH_WALLETS_SUCCESS:
      return {...state, loading: false, wallets: action.payload};
    case WalletsActionTypes.FETCH_WALLETS_ERROR:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};
