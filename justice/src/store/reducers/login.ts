import {LoginAction, LoginActionType} from '../../types/login'

const initialState = {
  email: null,
  password: null,
  error: null
}

export const loginReducer = (state = initialState, action: LoginAction) => {

  switch (action.type) {
    case LoginActionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        payload: action.payload
      }
    case LoginActionType.LOGIN_USER_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default: {
      return state
    }
  }
}