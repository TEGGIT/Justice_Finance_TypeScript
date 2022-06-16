import {RegistrationAction, RegistrationActionType} from "../../types/registration";


export const CreateUser = (payload: RegistrationAction) => {
  return {
    type: RegistrationActionType.CREATE_USER_SUCCESS,
    payload
  }
}