"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _UserActionBar = _interopRequireDefault(require("../components/UserActionBar"));
var _groupChannelBannedUsers = require("../domain/groupChannelBannedUsers");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelBannedUsersFragment = initModule => {
  const GroupChannelBannedUsersModule = (0, _groupChannelBannedUsers.createGroupChannelBannedUsersModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft,
      channel,
      renderUser,
      queryCreator = () => channel.createBannedUserListQuery({
        limit: 20
      })
    } = _ref;
    const {
      STRINGS
    } = (0, _useContext.useLocalization)();
    const {
      currentUser,
      sdk
    } = (0, _useContext.useSendbirdChat)();
    const {
      openMenu
    } = (0, _uikitReactNativeFoundation.useActionMenu)();
    const {
      users,
      deleteUser,
      loading,
      next,
      refresh,
      error
    } = (0, _uikitChatHooks.useUserList)(sdk, {
      queryCreator
    });
    const _renderUser = (0, _uikitUtils.useFreshCallback)(props => {
      if (renderUser) return renderUser(props);
      const {
        user
      } = props;
      return /*#__PURE__*/_react.default.createElement(_UserActionBar.default, {
        muted: false,
        uri: user.profileUrl,
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: () => {
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems: [{
              title: STRINGS.LABELS.UNBAN,
              onPress: () => channel.unbanUser(user).then(() => deleteUser(user.userId))
            }]
          });
        }
      });
    });
    return /*#__PURE__*/_react.default.createElement(GroupChannelBannedUsersModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(GroupChannelBannedUsersModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(GroupChannelBannedUsersModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(GroupChannelBannedUsersModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/_react.default.createElement(GroupChannelBannedUsersModule.List, {
      bannedUsers: users,
      renderUser: _renderUser,
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(GroupChannelBannedUsersModule.StatusEmpty, null),
      onLoadNext: next
    })));
  };
};
var _default = createGroupChannelBannedUsersFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelBannedUsersFragment.js.map