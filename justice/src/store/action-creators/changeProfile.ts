import {changeDataUserType, ChangeProfileActionTypes} from "../../types/changeProfile";


export const changeProfileFetch = () => {
  return {
    type: ChangeProfileActionTypes.CHANGE_PROFILE_FETCH,
  }
};


export const changeProfileSet = (payload: changeDataUserType[]) => {
  return {
    type: ChangeProfileActionTypes.CHANGE_PROFILE_SET,
    payload
  }
};