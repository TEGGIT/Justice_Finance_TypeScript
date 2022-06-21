import {UsersActionTypes, UserType} from "../../types/user";


export const FetchUser = () => {
  return {
    type: UsersActionTypes.FETCH_USERS_SUCCESS,
  }
};


export const SetUsers = (payload: UserType[]) => {
  return {
    type: UsersActionTypes.SET_USERS_SUCCESS,
    payload
  }
};

