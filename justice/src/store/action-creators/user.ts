import {UserAction, UsersActionTypes} from "../../types/todo";
import {Dispatch} from "redux";
import axios from "axios";

export const FetchUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: UsersActionTypes.FETCH_USERS})
        const response = await axios.get('http://localhost:5000/api/wallets', {headers:{
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbG1hY2hldi56aGVueWEwM0BnbWFpbC5jb20iLCJ1c2VySWQiOiI2Mjk4OTViYzllY2UxZjVjM2I5MjQ4ZGIiLCJpYXQiOjE2NTQ1OTAxMTQsImV4cCI6MTY1NDU5MzcxNH0.bc3_eO_p4MHO4JMNWoidU2JaCB1H6d7Wd5O-GHZYaE4'
          }
        })
      setTimeout(() => {
        dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
      },500)
    } catch (e) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при загрузке данных"})
    }
  }
}