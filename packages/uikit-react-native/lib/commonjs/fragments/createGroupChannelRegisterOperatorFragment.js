"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _UserSelectableBar = _interopRequireDefault(require("../components/UserSelectableBar"));
var _createUserListModule = _interopRequireDefault(require("../domain/userList/module/createUserListModule"));
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const createGroupChannelRegisterOperatorFragment = initModule => {
  const UserListModule = (0, _createUserListModule.default)(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      sortComparator,
      renderUser,
      onPressHeaderRight,
      queryCreator = () => channel.createMemberListQuery({
        limit: 20
      })
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
      refresh,
      next,
      error,
      loading
    } = (0, _uikitChatHooks.useUserList)(sdk, {
      queryCreator,
      sortComparator
    });
    const _renderUser = (0, _react.useCallback)((user, selectedUsers, setSelectedUsers) => {
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      const userIdx = selectedUsers.findIndex(u => u.userId === user.userId);
      const isSelected = userIdx > -1;
      const isOperator = user.role === 'operator';
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: 0.7,
        disabled: isOperator,
        onPress: () => {
          setSelectedUsers(_ref2 => {
            let [...draft] = _ref2;
            if (isSelected) draft.splice(userIdx, 1);else draft.push(user);
            return draft;
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_UserSelectableBar.default, {
        uri: user.profileUrl,
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        selected: isOperator || isSelected,
        disabled: isOperator
      }));
    }, [channel, renderUser]);
    return /*#__PURE__*/_react.default.createElement(UserListModule.Provider, {
      headerRight: selectedUsers => STRINGS.GROUP_CHANNEL_REGISTER_OPERATOR.HEADER_RIGHT({
        selectedUsers
      }),
      headerTitle: STRINGS.GROUP_CHANNEL_REGISTER_OPERATOR.HEADER_TITLE
    }, /*#__PURE__*/_react.default.createElement(UserListModule.Header, {
      shouldActivateHeaderRight: selectedUsers => selectedUsers.length > 0,
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: async users => {
        await channel.addOperators(users.map(it => it.userId));
        onPressHeaderRight(channel);
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
var _default = createGroupChannelRegisterOperatorFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelRegisterOperatorFragment.js.map