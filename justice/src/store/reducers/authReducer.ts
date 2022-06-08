import {AuthAction, AuthActionTypes} from "../../types/auth";
import Cookies from "js-cookie";

export const authReducer = (
  state = Boolean(Cookies.get('TOKEN')),
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