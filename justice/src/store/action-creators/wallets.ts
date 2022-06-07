import {WalletsAction, WalletsActionTypes} from "../../types/wallets";
import {Dispatch} from "redux";
import axios from "axios";

export const FetchWallets = () => {
  return async (dispatch: Dispatch<WalletsAction>) => {
    try {
      dispatch({
        type: WalletsActionTypes.FETCH_WALLETS
      })
      const response = await axios.get('http://localhost:5000/api/wallets', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbG1hY2hldi56aGVueWEwQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYyOTg5Njk0OWVjZTFmNWMzYjkyNDkyNyIsImlhdCI6MTY1NDU5NjQ0MCwiZXhwIjoxNjU0NjAwMDQwfQ.G9msPCEmr6Ok-c8sXDrXBNAvhXRilycgGc-aceAVDWY'
        }
      })
      setTimeout(() => {
        dispatch({type: WalletsActionTypes.FETCH_WALLETS_SUCCESS, payload: response.data})
      }, 500)
      console.log(response)
    } catch (e) {
      dispatch({
        type: WalletsActionTypes.FETCH_WALLETS_ERROR,
        payload: "Произошла ошибка при загрузке данных"
      })
    }
  }
}