
export enum RegistrationActionType {
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_ERROR = 'CREATE_USER_ERROR'
}
export type RegistrationType = {
  password: string;
  name: string;
  email: string
}
interface RegistrationActionInterface  {
  payload: { password: string; name: string; email: string };
  type: RegistrationActionType
  name: RegistrationType,
  email: RegistrationType,
  error?: boolean
  password: RegistrationType
}

export type RegistrationAction = RegistrationActionInterface