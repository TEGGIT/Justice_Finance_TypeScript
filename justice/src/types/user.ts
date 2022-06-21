import {WalletsType} from "../store/reducers/WalletsReducer";
import {TransactionType} from "./transaction";

export enum UsersActionTypes {
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  SET_USERS_SUCCESS = "SET_USERS_SUCCESS"
}

export type UserType = {
  data: [{
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
  }]
  email: string;
  password: string;
  name: string;
  wallets: WalletsType[];
  transaction: TransactionType[];
  birthday: string;
  city: string;
  phoneNumber: number;
}


interface FetchUsersSuccessAction {
  type: UsersActionTypes.FETCH_USERS_SUCCESS;
  payload: UserType[];
}

interface SetUsersAction {
  type: UsersActionTypes.SET_USERS_SUCCESS;
  payload: UserType[];
}

export type UserAction =
  | FetchUsersSuccessAction
  | SetUsersAction
