import {WalletActionTypes, WalletAction} from "../../types/createWallet";

const initialState = {
  wallets: []
};

export const createWalletReducer = (state = initialState, action: WalletAction) => {
  switch (action.type) {
    case WalletActionTypes.CREATE_NEW_WALLET:
      return {
        ...state,
        wallets: action.payload
      }

    default: {
      return state;
    }
  }
};