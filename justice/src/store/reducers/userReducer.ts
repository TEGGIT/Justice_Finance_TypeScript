import {UserAction, UsersActionTypes, UserType} from "../../types/user";

export interface UserState {
  users: UserType[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UsersActionTypes.SET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
      };
    default: {
      return state;
    }
  }
};
