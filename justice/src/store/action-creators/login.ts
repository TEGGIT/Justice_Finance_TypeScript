import {LoginAction, LoginActionType} from "../../types/login";

export const AuthUser = (payload: LoginAction) => {
  return {
    type: LoginActionType.LOGIN_USER_SUCCESS,
    payload
  }
}

export const AuthUserError = (payload: boolean) => {
  return {
    type: LoginActionType.LOGIN_USER_ERROR,
    payload
  }
}