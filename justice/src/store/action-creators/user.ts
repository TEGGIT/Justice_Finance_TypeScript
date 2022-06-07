import {UserAction, UsersActionTypes} from "../../types/user";
import {Dispatch} from "redux";
import axios from "axios";

export const FetchUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: UsersActionTypes.FETCH_USERS
      })
      const response = await axios.get('http://localhost:5000/api/wallets', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbG1hY2hldi56aGVueWEwQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYyOTg5Njk0OWVjZTFmNWMzYjkyNDkyNyIsImlhdCI6MTY1NDU5NjQ0MCwiZXhwIjoxNjU0NjAwMDQwfQ.G9msPCEmr6Ok-c8sXDrXBNAvhXRilycgGc-aceAVDWY'
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