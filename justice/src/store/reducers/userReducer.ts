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
    case UsersActionTypes.FETCH_USERS:
      return {
        ...state,
        loading: true,
        error: null,
        users: []
      };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {loading: false, error: null, users: action.payload};
    case UsersActionTypes.FETCH_USERS_ERROR:
      return {loading: false, error: action.payload, users: []};
    default: {
      return state;
    }
  }
};
