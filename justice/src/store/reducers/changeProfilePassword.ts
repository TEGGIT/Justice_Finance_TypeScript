import {
  ChangeProfilePasswordActionTypes,
  changeDataUserPasswordType,
  ChangeProfilePasswordType
} from "../../types/changeProfilePassword";

export interface ChangePasswordState {
  password: changeDataUserPasswordType | null;

}

const initialState: ChangePasswordState = {
  password: null,
};

export const changeProfilePasswordReducer = (
  state = initialState,
  action: ChangeProfilePasswordType
): ChangePasswordState => {
  switch (action.type) {
    case ChangeProfilePasswordActionTypes.CHANGE_PROFILE_PASSWORD_SET:
      return {
        password: action.payload,
      };
    default: {
      return state;
    }
  }
};