import {UsersActionTypes, UserType} from "../../types/user";


export const FetchUser = () => {
  return {
    type: UsersActionTypes.FETCH_USERS_SUCCESS,
  }
};


export const SetUsers = (payload: UserType[]) => {
  return {
    type: UsersActionTypes.SET_USERS_SUCCESS,
    payload
  }
};


// return async (dispatch: Dispatch<UserAction>) => {
//   try {
//     dispatch({
//       type: UsersActionTypes.FETCH_USERS,
//     });
//     dispatch({
//       type: UsersActionTypes.FETCH_USERS_SUCCESS,
//       payload
//     });
//   } catch (e) {
//     dispatch({
//       type: UsersActionTypes.FETCH_USERS_ERROR,
//       payload: "Произошла ошибка при загрузке данных",
//     });
//     Cookies.remove("TOKEN");
//     window.location.href = '/'
//   }
// };

