"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _UserActionBar = _interopRequireDefault(require("../components/UserActionBar"));
var _constants = require("../constants");
var _createUserListModule = _interopRequireDefault(require("../domain/userList/module/createUserListModule"));
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const RETURN_EMPTY_STRING = () => '';
const createOpenChannelParticipantsFragment = initModule => {
  const UserListModule = (0, _createUserListModule.default)(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      renderUser,
      sortComparator,
      queryCreator = () => channel.createParticipantListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = (0, _uikitUtils.useUniqHandlerId)('OpenChannelParticipantsFragment');
    const refreshSchedule = (0, _react.useRef)();
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
      show
    } = (0, _useContext.useUserProfile)();
    const {
      users,
      refresh,
      loading,
      next,
      error,
      upsertUser,
      deleteUser
    } = (0, _uikitChatHooks.useUserList)(sdk, {
      queryCreator,
      sortComparator
    });
    (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
      onUserExited(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onUserBanned(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onOperatorUpdated(eventChannel) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        if (refreshSchedule.current) clearTimeout(refreshSchedule.current);
        refreshSchedule.current = setTimeout(() => refresh(), 500);
      },
      onUserMuted(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel) || !eventChannel.isOpenChannel()) return;
        // @ts-ignore - SDK should migrate User to Participant
        user.isMuted = true;
        upsertUser(user);
      },
      onUserUnmuted(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel) || !eventChannel.isOpenChannel()) return;
        // @ts-ignore - SDK should migrate User to Participant
        user.isMuted = false;
        upsertUser(user);
      }
    }, 'open');
    const _renderUser = (0, _uikitUtils.useFreshCallback)((user, selectedUsers, setSelectedUsers) => {
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      const isUserMuted = user.isMuted;
      const isUserOperator = channel.isOperator(user.userId);
      const isCurrentUserOperator = channel.isOperator((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? _constants.UNKNOWN_USER_ID);
      return /*#__PURE__*/_react.default.createElement(_UserActionBar.default, {
        muted: isUserMuted,
        uri: user.profileUrl,
        label: (0, _uikitUtils.ifThenOr)(isUserOperator, STRINGS.LABELS.USER_BAR_OPERATOR, ''),
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (0, _uikitUtils.ifThenOr)(user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId), STRINGS.LABELS.USER_BAR_ME_POSTFIX, ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: (0, _uikitUtils.ifThenOr)(isCurrentUserOperator, () => {
          const menuItems = [];
          menuItems.push({
            title: (0, _uikitUtils.ifThenOr)(isUserOperator, STRINGS.LABELS.UNREGISTER_OPERATOR, STRINGS.LABELS.REGISTER_AS_OPERATOR),
            onPress: (0, _uikitUtils.ifThenOr)(isUserOperator, () => channel.removeOperators([user.userId]), () => channel.addOperators([user.userId]))
          });
          menuItems.push({
            title: (0, _uikitUtils.ifThenOr)(isUserMuted, STRINGS.LABELS.UNMUTE, STRINGS.LABELS.MUTE),
            onPress: (0, _uikitUtils.ifThenOr)(isUserMuted, () => channel.unmuteUser(user), () => channel.muteUser(user))
          });
          menuItems.push({
            title: STRINGS.LABELS.BAN,
            style: 'destructive',
            onPress: () => channel.banUser(user)
          });
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems
          });
        }),
        onPressAvatar: () => show(user)
      });
    });
    return /*#__PURE__*/_react.default.createElement(UserListModule.Provider, {
      headerRight: RETURN_EMPTY_STRING,
      headerTitle: STRINGS.OPEN_CHANNEL_PARTICIPANTS.HEADER_TITLE
    }, /*#__PURE__*/_react.default.createElement(UserListModule.Header, {
      onPressHeaderRight: _uikitUtils.ASYNC_NOOP,
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(UserListModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(UserListModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/_react.default.createElement(UserListModule.List, {
      users: users,
      renderUser: _renderUser,
      onLoadNext: next,
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(UserListModule.StatusEmpty, null)
    })));
  };
};
var _default = createOpenChannelParticipantsFragment;
exports.default = _default;
//# sourceMappingURL=createOpenChannelParticipantsFragment.js.map