import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {walletsReducer} from "./WalletsReducer";


export const rootReducer = combineReducers({
  user: userReducer,
  wallets: walletsReducer,
})

export type RootState = ReturnType<typeof rootReducer>