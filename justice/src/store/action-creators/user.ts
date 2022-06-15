import {UserAction, UsersActionTypes} from "../../types/user";
import {Dispatch} from "redux";
import axios from "axios";
import Cookies from "js-cookie";

export const FetchUser = (payload) => {
  console.log(payload)
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: UsersActionTypes.FETCH_USERS,
      });
      dispatch({
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: payload,
      });
    } catch (e) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при загрузке данных",
      });
      Cookies.remove("TOKEN");
      window.location.href = '/'
    }
  };
};
