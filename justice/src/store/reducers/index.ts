import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {walletsReducer} from "./WalletsReducer";
import {authReducer} from './authReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  wallets: walletsReducer,
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>