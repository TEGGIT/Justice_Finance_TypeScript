import {RegistrationAction, RegistrationActionType} from "../../types/registration";

export const CreateUser = (payload: RegistrationAction) => {
  return {
    type: RegistrationActionType.CREATE_USER_SUCCESS,
    payload
  }
}

export const CreateUserError = (payload: boolean) => {
  return {
    type: RegistrationActionType.CREATE_USER_ERROR,
    payload
  }
}