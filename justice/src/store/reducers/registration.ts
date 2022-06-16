import {RegistrationAction, RegistrationActionType} from '../../types/registration'

const initialState = {
  name: null,
  email: null,
  password: null
}

export const registrationReducer = (state = initialState, action: RegistrationAction) => {

  switch (action.type) {
    case RegistrationActionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        exchangeRates: action.payload
      }

    default: {
      return state
    }
  }
}