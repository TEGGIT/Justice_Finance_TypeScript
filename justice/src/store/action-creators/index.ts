import * as UserActionCreators from '../action-creators/user'
import * as WalletsActionCreators from '../action-creators/wallets'
import * as AuthActionCreators from '../action-creators/auth'
import * as ExchangeRatesActionCreators from '../action-creators/exchangeRates'
import * as RegistrationActionCreators from '../action-creators/registration'
import * as LoginActionCreators from '../action-creators/login'
import * as ChangeProfileCreators from '../action-creators/changeProfile'
import * as ChangeProfilePasswordCreators from '../action-creators/changeProfilePassword'
import * as CreateWalletCreators from '../action-creators/createWallet'
import * as TransactionCreators from '../action-creators/transaction'
import * as UpdateWalletCreators from '../action-creators/updateWallet'
import * as RemoveWalletCreators from '../action-creators/removeWallet'

export default {
  ...WalletsActionCreators,
  ...UserActionCreators,
  ...AuthActionCreators,
  ...ExchangeRatesActionCreators,
  ...RegistrationActionCreators,
  ...LoginActionCreators,
  ...ChangeProfileCreators,
  ...ChangeProfilePasswordCreators,
  ...CreateWalletCreators,
  ...TransactionCreators,
  ...UpdateWalletCreators,
  ...RemoveWalletCreators


}