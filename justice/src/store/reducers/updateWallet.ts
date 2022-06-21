import {UpdateWalletType, UpdateWalletActionTypes} from "../../types/updateWallet";

export interface UpdateWalletState {
  update: UpdateWalletActionTypes[];

}

const initialState: UpdateWalletState = {
  update: [],
};

export const updateWalletReducer = (
  state = initialState,
  action: UpdateWalletType
): UpdateWalletState => {
  switch (action.type) {
    case UpdateWalletActionTypes.UPDATE_WALLETS:
      return {
        update: action.payload,
      };
    default: {
      return state;
    }
  }
};