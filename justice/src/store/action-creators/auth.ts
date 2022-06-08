import {AuthActionTypes} from "../../types/auth";


export const loginUser = (payload: boolean) => {
  return {
    type: AuthActionTypes.LOGIN,
    payload
  }
}
