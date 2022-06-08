export enum AuthActionTypes {
  LOGIN = "LOGIN",
}

interface AuthActionTrue {
  type: AuthActionTypes.LOGIN;
  payload: boolean;
}

export type AuthAction = AuthActionTrue
