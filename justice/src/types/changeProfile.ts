export enum ChangeProfileActionTypes {
  CHANGE_PROFILE_FETCH = "CHANGE_PROFILE_FETCH",
  CHANGE_PROFILE_SET = "CHANGE_PROFILE_SET"
}

export type changeDataUserType = {

  email: string;
  password: string;
  name: string;
  birthday: string;
  city: string;
  phoneNumber: number;
}


interface ChangeProfileAction {
  type: ChangeProfileActionTypes.CHANGE_PROFILE_FETCH;
  payload: changeDataUserType;
}

interface ChangeProfileSetAction {
  type: ChangeProfileActionTypes.CHANGE_PROFILE_SET;
  payload: changeDataUserType;
}

export type ChangeProfileType =
  | ChangeProfileAction
  | ChangeProfileSetAction