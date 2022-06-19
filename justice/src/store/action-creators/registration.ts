import {RegistrationActionType, RegistrationType} from "../../types/registration";



export const CreateUser = (payload: RegistrationType) => {
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