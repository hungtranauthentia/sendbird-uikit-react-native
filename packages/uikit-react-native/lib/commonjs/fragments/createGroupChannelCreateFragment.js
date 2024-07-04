"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitUtils = require("@sendbird/uikit-utils");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _UserSelectableBar = _interopRequireDefault(require("../components/UserSelectableBar"));
var _createUserListModule = _interopRequireDefault(require("../domain/userList/module/createUserListModule"));
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelCreateFragment = initModule => {
  const UserListModule = (0, _createUserListModule.default)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft,
      onBeforeCreateChannel = _uikitUtils.PASS,
      onCreateChannel,
      sortComparator,
      queryCreator,
      channelType = 'GROUP',
      renderUser
    } = _ref;
    const {
      sdk,
      currentUser
    } = (0, _useContext.useSendbirdChat)();
    const {
      STRINGS
    } = (0, _useContext.useLocalization)();
    const {
      users,
      refreshing,
      loading,
      error,
      refresh,
      next
    } = (0, _uikitChatHooks.useUserList)(sdk, {
      queryCreator,
      sortComparator
    });
    const _renderUser = (0, _uikitUtils.useFreshCallback)((user, selectedUsers, setSelectedUsers) => {
      if (queryCreator && !renderUser) {
        const hasRequiredKey = 'profileUrl' in user && 'nickname' in user;
        if (!hasRequiredKey) throw new Error('You should provide "renderUser" when providing "queryCreator"');
      }
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      const isMe = user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
      if (isMe) return null;
      const userIdx = selectedUsers.findIndex(u => u.userId === user.userId);
      const isSelected = userIdx > -1;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: 0.7,
        onPress: () => {
          setSelectedUsers(_ref2 => {
            let [...draft] = _ref2;
            if (isSelected) draft.splice(userIdx, 1);else draft.push(user);
            return draft;
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_UserSelectableBar.default, {
        uri: user.profileUrl,
        name: user.nickname || STRINGS.LABELS.USER_NO_NAME,
        selected: isSelected,
        disabled: false
      }));
    });
    return /*#__PURE__*/_react.default.createElement(UserListModule.Provider, {
      headerRight: selectedUsers => STRINGS.GROUP_CHANNEL_CREATE.HEADER_RIGHT({
        selectedUsers
      }),
      headerTitle: STRINGS.GROUP_CHANNEL_CREATE.HEADER_TITLE
    }, /*#__PURE__*/_react.default.createElement(UserListModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: async users => {
        const params = (0, _uikitUtils.getDefaultGroupChannelCreateParams)({
          invitedUserIds: users.map(it => it.userId),
          currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId
        });
        if (channelType === 'BROADCAST') params.isBroadcast = true;
        if (channelType === 'SUPER_GROUP') params.isSuper = true;
        const processedParams = await onBeforeCreateChannel(params, users);
        const channel = await sdk.groupChannel.createChannel(processedParams);
        onCreateChannel(channel);
      }
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      error: Boolean(error),
      LoadingComponent: /*#__PURE__*/_react.default.createElement(UserListModule.StatusLoading, null),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(UserListModule.StatusError, {
        onPressRetry: () => refresh()
      })
    }, /*#__PURE__*/_react.default.createElement(UserListModule.List, {
      onLoadNext: next,
      users: users,
      renderUser: _renderUser,
      onRefresh: refresh,
      refreshing: refreshing,
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(UserListModule.StatusEmpty, null)
    })));
  };
};
var _default = createGroupChannelCreateFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelCreateFragment.js.map