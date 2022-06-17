import {ChangeProfileActionTypes} from "../../types/changeProfile";


export interface Change {
  birthday: string;
  phoneNumber: number;
  city: string;
  name: string;
  email: string
}

export const changeProfileFetch = () => {
  return {
    type: ChangeProfileActionTypes.CHANGE_PROFILE_FETCH,
  }
};


export const changeProfileSet = (payload: Change) => {
  return {
    type: ChangeProfileActionTypes.CHANGE_PROFILE_SET,
    payload
  }
};