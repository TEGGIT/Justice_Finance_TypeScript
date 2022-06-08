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
      await axios.get('http://localhost:5000/api/wallets', {
        headers: {
          Authorization: `${Cookies.get("TOKEN")}`
        }
      }).then((response) =>
        dispatch({
          type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: response.data
        })
      ).catch(function () {
        Cookies.remove("TOKEN")
        alert('Срок годности токена истек.' +
          'Необходимо повторно авторизоваться.')
      })
    } catch (e) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при загрузке данных"
      })
    }
  }
}