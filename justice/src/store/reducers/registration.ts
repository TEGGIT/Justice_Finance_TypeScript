import {RegistrationAction, RegistrationActionType} from '../../types/registration'

const initialState = {
  name: null,
  email: null,
  password: null,
  error: null
}

export const registrationReducer = (state = initialState, action: RegistrationAction) => {

  switch (action.type) {
    case RegistrationActionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        payload: action.payload
      }
    case RegistrationActionType.CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default: {
      return state
    }
  }
}