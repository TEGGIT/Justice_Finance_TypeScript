import {ChangeProfileType, ChangeProfileActionTypes, changeDataUserType} from "../../types/changeProfile";

export interface ChangeState {
  users: changeDataUserType[];

}

const initialState: ChangeState = {
  users: [],
};

export const changeProfileReducer = (
  state = initialState,
  action: ChangeProfileType
): ChangeState => {
  switch (action.type) {
    case ChangeProfileActionTypes.CHANGE_PROFILE_SET:
      return {
        users: action.payload,
      };
    default: {
      return state;
    }
  }
};