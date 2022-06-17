export enum LoginActionType {
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
}

interface LoginActionTypeActionInterface {
  payload?: { password: null; email: null };
  type?: LoginActionType
  email: string,
  error?: boolean
  password: string
}

export type LoginAction = LoginActionTypeActionInterface