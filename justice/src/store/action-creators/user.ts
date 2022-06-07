import {UserAction, UsersActionTypes} from "../../types/user";
import {Dispatch} from "redux";
import axios from "axios";
import Cookies from "js-cookie";

export const FetchUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: UsersActionTypes.FETCH_USERS
      })
      const response = await axios.get('http://localhost:5000/api/wallets', {
        headers: {
          Authorization: `${Cookies.get("TOKEN")}`
        }
      })
      setTimeout(() => {
        dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
      }, 500)
    } catch (e) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при загрузке данных"
      })
    }
  }
}