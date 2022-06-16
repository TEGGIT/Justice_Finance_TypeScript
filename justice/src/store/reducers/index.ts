import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {walletsReducer} from "./WalletsReducer";
import {authReducer} from './authReducer'
import {exchangeRatesReducer} from './exchangeRates';
import {registrationReducer} from './registration'

export const rootReducer = combineReducers({

  user: userReducer,
  wallets: walletsReducer,
  auth: authReducer,
  exchangeRates: exchangeRatesReducer,
  registration: registrationReducer

})


export type RootState = ReturnType<typeof rootReducer>