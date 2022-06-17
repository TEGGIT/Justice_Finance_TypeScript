import {ChangeProfilePasswordActionTypes} from "../../types/changeProfilePassword";


export interface ChangePassword {
  password: string
  newPassword: string
}


export const changeProfilePasswordSet = (payload: ChangePassword) => {
  return {
    type: ChangeProfilePasswordActionTypes.CHANGE_PROFILE_PASSWORD_SET,
    payload
  }
};