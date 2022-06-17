import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {walletsReducer} from "./WalletsReducer";
import {authReducer} from './authReducer'
import {exchangeRatesReducer} from './exchangeRates';
import {registrationReducer} from './registration'
import {loginReducer} from './login'

export const rootReducer = combineReducers({

  user: userReducer,
  wallets: walletsReducer,
  auth: authReducer,
  exchangeRates: exchangeRatesReducer,
  registration: registrationReducer,
  login: loginReducer

})


export type RootState = ReturnType<typeof rootReducer>