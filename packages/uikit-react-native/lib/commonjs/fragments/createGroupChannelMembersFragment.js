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
var _createUserListModule = _interopRequireDefault(require("../domain/userList/module/createUserListModule"));
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const RETURN_EMPTY_STRING = () => '';
const createGroupChannelMembersFragment = initModule => {
  const UserListModule = (0, _createUserListModule.default)(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      onPressHeaderRight,
      renderUser,
      sortComparator,
      queryCreator = () => channel.createMemberListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelMembersFragment');
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
      onUserLeft(eventChannel, user) {
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
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel) || !eventChannel.isGroupChannel()) return;
        const memberFromChannel = eventChannel.members.find(it => it.userId === user.userId);
        if (memberFromChannel) return upsertUser(memberFromChannel);
        const memberFromList = users.find(it => it.userId === user.userId);
        if (memberFromList) {
          memberFromList.isMuted = true;
          upsertUser(memberFromList);
        }
      },
      onUserUnmuted(eventChannel, user) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel) || !eventChannel.isGroupChannel()) return;
        const memberFromChannel = eventChannel.members.find(it => it.userId === user.userId);
        if (memberFromChannel) return upsertUser(memberFromChannel);
        const memberFromList = users.find(it => it.userId === user.userId);
        if (memberFromList) {
          memberFromList.isMuted = false;
          upsertUser(memberFromList);
        }
      }
    });
    const _renderUser = (0, _uikitUtils.useFreshCallback)((user, selectedUsers, setSelectedUsers) => {
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      return /*#__PURE__*/_react.default.createElement(_UserActionBar.default, {
        muted: user.isMuted,
        uri: user.profileUrl,
        label: user.role === 'operator' ? STRINGS.LABELS.USER_BAR_OPERATOR : '',
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: (0, _uikitUtils.ifOperator)(channel.myRole, () => {
          const menuItems = [];
          menuItems.push({
            title: (0, _uikitUtils.ifOperator)(user.role, STRINGS.LABELS.UNREGISTER_OPERATOR, STRINGS.LABELS.REGISTER_AS_OPERATOR),
            onPress: (0, _uikitUtils.ifOperator)(user.role, () => channel.removeOperators([user.userId]), () => channel.addOperators([user.userId]))
          });
          if (!channel.isBroadcast) {
            menuItems.push({
              title: (0, _uikitUtils.ifThenOr)(user.isMuted, STRINGS.LABELS.UNMUTE, STRINGS.LABELS.MUTE),
              onPress: (0, _uikitUtils.ifThenOr)(user.isMuted, () => channel.unmuteUser(user), () => channel.muteUser(user))
            });
          }
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
      headerTitle: STRINGS.GROUP_CHANNEL_MEMBERS.HEADER_TITLE
    }, /*#__PURE__*/_react.default.createElement(UserListModule.Header, {
      shouldActivateHeaderRight: () => true,
      onPressHeaderLeft: onPressHeaderLeft,
      right: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'plus'
      }),
      onPressHeaderRight: async () => onPressHeaderRight()
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
var _default = createGroupChannelMembersFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelMembersFragment.js.map