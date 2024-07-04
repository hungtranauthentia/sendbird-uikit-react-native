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
var _groupChannelOperators = require("../domain/groupChannelOperators");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelOperatorsFragment = initModule => {
  const GroupChannelOperatorsModule = (0, _groupChannelOperators.createGroupChannelOperatorsModule)(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      onPressHeaderRight,
      renderUser,
      queryCreator = () => channel.createOperatorListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelOperatorsFragment');
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
      deleteUser,
      upsertUser,
      loading,
      refresh,
      next,
      error
    } = (0, _uikitChatHooks.useUserList)(sdk, {
      queryCreator
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
      onOperatorUpdated(eventChannel, updatedUsers) {
        if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
        const operatorsAdded = users.length < updatedUsers.length;
        if (operatorsAdded) updatedUsers.forEach(upsertUser);
      }
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
        onPressAvatar: () => show(user),
        onPressActionMenu: (0, _uikitUtils.ifOperator)(channel.myRole, () => {
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems: [{
              title: STRINGS.LABELS.UNREGISTER_OPERATOR,
              onPress: () => channel.removeOperators([user.userId]).then(() => deleteUser(user.userId))
            }]
          });
        })
      });
    });
    return /*#__PURE__*/_react.default.createElement(GroupChannelOperatorsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(GroupChannelOperatorsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: onPressHeaderRight
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(GroupChannelOperatorsModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(GroupChannelOperatorsModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/_react.default.createElement(GroupChannelOperatorsModule.List, {
      operators: users,
      renderUser: _renderUser,
      onLoadNext: next,
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(GroupChannelOperatorsModule.StatusEmpty, null)
    })));
  };
};
var _default = createGroupChannelOperatorsFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelOperatorsFragment.js.map