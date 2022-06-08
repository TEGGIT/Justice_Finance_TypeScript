import {AuthAction, AuthActionTypes} from "../../types/auth";

export const authReducer = (
  state = false,
  action: AuthAction
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return action.payload;
    default: {
      return state;
    }
  }
};