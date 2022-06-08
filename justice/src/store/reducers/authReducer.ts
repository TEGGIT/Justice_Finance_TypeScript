import { AuthAction, AuthActionTypes } from "../../types/auth";
import Cookies from "js-cookie";

interface IsAuth {
  isAuth: boolean;
}

const initialState: IsAuth = {
  isAuth: Boolean(Cookies.get("TOKEN")),
};

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return action.payload;

    default: {
      return state;
    }
  }
};
