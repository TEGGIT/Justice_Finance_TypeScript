export enum LoginActionType {
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
}

export type LoginType = {
  email: string,
  password: string

}


interface LoginActionTypeActionInterface {
  payload?: { password: null; email: null };
  type: LoginActionType
  error?: boolean
  email:LoginType
  password:LoginType
}

export type LoginAction = LoginActionTypeActionInterface