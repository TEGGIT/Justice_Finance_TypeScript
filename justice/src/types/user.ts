import {WalletsType} from "../store/reducers/WalletsReducer";

export enum UsersActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

interface FetchUsersAction {
  type: UsersActionTypes.FETCH_USERS;
}

export type UserType = {
  email: string;
  password: string;
  name: string;
  wallets: WalletsType[];
  transaction: [
    {
      get: string;
      Hour: number;
      Minutes: number;
      give: string;
      giveValue: number;
      getValue: number;
    }
  ];
  birthday: string;
  city: string;
  phoneNumber: number;
}


interface FetchUsersSuccessAction {
  type: UsersActionTypes.FETCH_USERS_SUCCESS;
  payload: UserType[];
}

interface FetchUsersErrorAction {
  type: UsersActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

export type UserAction =
  | FetchUsersAction
  | FetchUsersErrorAction
  | FetchUsersSuccessAction;
