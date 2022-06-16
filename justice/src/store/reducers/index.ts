import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {walletsReducer} from "./WalletsReducer";
import {authReducer} from './authReducer'
import {exchangeRatesReducer} from './exchangeRates';

export const rootReducer = combineReducers({

  user: userReducer,
  wallets: walletsReducer,
  auth: authReducer,
  exchangeRates: exchangeRatesReducer

})


export type RootState = ReturnType<typeof rootReducer>