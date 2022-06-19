import {RemoveWalletType, RemoveWalletActionTypes} from "../../types/removeWallet";

export interface RemoveWalletState {
  remove: RemoveWalletActionTypes[];

}

const initialState: RemoveWalletState = {
  remove: [],
};

export const removeWalletReducer = (
  state = initialState,
  action: RemoveWalletType
): RemoveWalletState => {
  switch (action.type) {
    case RemoveWalletActionTypes.REMOVE_WALLETS:
      return {
        remove: action.payload,
      };
    default: {
      return state;
    }
  }
};