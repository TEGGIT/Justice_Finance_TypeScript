import {TakeableChannel} from "redux-saga";

export enum RegistrationActionType {
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR'
}

interface RegistrationActionInterface  {
  payload?: { password: null; name: null; email: null };
  type: RegistrationActionType
  name: string,
  email: string,
  error?: boolean
  password: string
}

export type RegistrationAction = RegistrationActionInterface