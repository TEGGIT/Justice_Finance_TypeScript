export enum ChangeProfilePasswordActionTypes {
  CHANGE_PROFILE_PASSWORD_SET = "CHANGE_PROFILE_PASSWORD_SET"
}

export type changeDataUserPasswordType = {
  password: string;
  oldPassword: string

}


interface ChangeProfileSetAction {
  type: ChangeProfilePasswordActionTypes.CHANGE_PROFILE_PASSWORD_SET;
  payload: changeDataUserPasswordType[];
}

export type ChangeProfilePasswordType =
  | ChangeProfileSetAction