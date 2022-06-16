export enum RegistrationActionType {
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
}

interface RegistrationActionInterface {
  type: RegistrationActionType;
  // TODO исправить типы
  payload: any
}

export type RegistrationAction = RegistrationActionInterface