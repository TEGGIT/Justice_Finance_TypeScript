import * as UserActionCreators from '../action-creators/user'
import * as WalletsActionCreators from '../action-creators/wallets'
import * as AuthActionCreators from '../action-creators/auth'

export default {
  ...WalletsActionCreators,
  ...UserActionCreators,
  ...AuthActionCreators
}