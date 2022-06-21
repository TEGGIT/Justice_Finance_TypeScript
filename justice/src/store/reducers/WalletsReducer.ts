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
    case WalletsActionTypes.SET_WALLETS_SUCCESS:
      return {
        ...state,
        loading: false,
        wallets: action.payload,
      };
    default:
      return state;
  }
};
