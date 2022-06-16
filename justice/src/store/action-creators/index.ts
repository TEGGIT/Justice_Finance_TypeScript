import * as UserActionCreators from '../action-creators/user'
import * as WalletsActionCreators from '../action-creators/wallets'
import * as AuthActionCreators from '../action-creators/auth'
import * as ExchangeRatesActionCreators from '../action-creators/exchangeRates'

export default {
  ...WalletsActionCreators,
  ...UserActionCreators,
  ...AuthActionCreators,
  ...ExchangeRatesActionCreators

}