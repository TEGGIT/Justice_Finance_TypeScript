import {WalletsAction, WalletsActionTypes} from "../../types/wallets";
import {Dispatch} from "redux";
import axios from "axios";
import Cookies from "js-cookie";

export const FetchWallets = () => {
  return async (dispatch: Dispatch<WalletsAction>) => {
    try {
      dispatch({
        type: WalletsActionTypes.FETCH_WALLETS
      })
      const response = await axios.get('http://localhost:5000/api/wallets', {
        headers: {
          Authorization: `${Cookies.get("TOKEN")}`
        }
      })
      dispatch({type: WalletsActionTypes.FETCH_WALLETS_SUCCESS, payload: response.data[0].wallets})
    } catch (e) {
      dispatch({
        type: WalletsActionTypes.FETCH_WALLETS_ERROR,
        payload: "Произошла ошибка при загрузке данных"
      })
    }
  }
}