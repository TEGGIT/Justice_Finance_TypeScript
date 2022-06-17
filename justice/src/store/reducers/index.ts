import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {walletsReducer} from "./WalletsReducer";
import {authReducer} from './authReducer'
import {exchangeRatesReducer} from './exchangeRates';
import {registrationReducer} from './registration'
import {loginReducer} from './login'
import {changeProfileReducer} from "./changeProfile";
import {changeProfilePasswordReducer} from "./changeProfilePassword";
import {createWalletReducer} from "./createWallet";

export const rootReducer = combineReducers({

  user: userReducer,
  wallets: walletsReducer,
  auth: authReducer,
  exchangeRates: exchangeRatesReducer,
  registration: registrationReducer,
  login: loginReducer,
  changeProfile: changeProfileReducer,
  changePassword: changeProfilePasswordReducer,
  createWallet: createWalletReducer,

})


export type RootState = ReturnType<typeof rootReducer>