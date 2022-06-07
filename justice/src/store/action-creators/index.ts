import * as UserActionCreators from '../action-creators/user'
import * as WalletsActionCreators from '../action-creators/wallets'

export default {
  ...WalletsActionCreators,
  ...UserActionCreators
}