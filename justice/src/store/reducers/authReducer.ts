import {AuthAction, AuthActionTypes} from "../../types/auth";

export const authReducer = (
  state = false,
  action: AuthAction
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      console.log('qwe', action.payload)
      return action.payload;

    default: {
      return state;
    }
  }
};