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
var _groupChannelMutedMembers = require("../domain/groupChannelMutedMembers");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelMutedMembersFragment = initModule => {
  const GroupChannelMutedMembersModule = (0, _groupChannelMutedMembers.createGroupChannelMutedMembersModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      channel,
      renderUser,
      queryCreator = () => channel.createMutedUserListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelMutedMembersFragment');
    const {
      STRINGS
    } = (0, _useContext.useLocalization)();
    const {
      sdk,
      currentUser
    } = (0, _useContext.useSendbirdChat)();
    const {
      openMenu
    } = (0, _uikitReactNativeFoundation.useActionMenu)();
    const {
      users,
      deleteUser,
      upsertUser,
      loading,
      refresh,
      error,
      next
    } = (0, _uikitChatHooks.useUserList)(sdk, {
      queryCreator
    });
    (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
      onUserMuted(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        upsertUser(user);
      },
      onUserUnmuted(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onUserLeft(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onUserBanned(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        deleteUser(user.userId);
      }
    });
    const _renderUser = (0, _uikitUtils.useFreshCallback)(props => {
      if (renderUser) return renderUser(props);
      const {
        user
      } = props;
      return /*#__PURE__*/_react.default.createElement(_UserActionBar.default, {
        muted: true,
        uri: user.profileUrl,
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: () => {
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems: [{
              title: STRINGS.LABELS.UNMUTE,
              onPress: () => channel.unmuteUser(user).then(() => deleteUser(user.userId))
            }]
          });
        }
      });
    });
    return /*#__PURE__*/_react.default.createElement(GroupChannelMutedMembersModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(GroupChannelMutedMembersModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(GroupChannelMutedMembersModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(GroupChannelMutedMembersModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/_react.default.createElement(GroupChannelMutedMembersModule.List, {
      mutedMembers: users,
      onLoadNext: next,
      renderUser: _renderUser,
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(GroupChannelMutedMembersModule.StatusEmpty, null)
    })));
  };
};
var _default = createGroupChannelMutedMembersFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelMutedMembersFragment.js.map