"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OpenChannelModerationMenu = _ref => {
  let {
    onPressMenuBannedUsers,
    onPressMenuMutedParticipants,
    onPressMenuOperators,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const menuItems = menuItemsCreator([{
    icon: 'operator',
    name: STRINGS.OPEN_CHANNEL_MODERATION.MENU_OPERATORS,
    onPress: () => onPressMenuOperators(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'mute',
    name: STRINGS.OPEN_CHANNEL_MODERATION.MENU_MUTED_PARTICIPANTS,
    onPress: () => onPressMenuMutedParticipants(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'ban',
    name: STRINGS.OPEN_CHANNEL_MODERATION.MENU_BANNED_USERS,
    onPress: () => onPressMenuBannedUsers(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, menuItems.map(menu => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.MenuBar, {
      key: menu.name,
      onPress: menu.onPress,
      name: menu.name,
      disabled: menu.disabled,
      visible: menu.visible,
      icon: menu.icon,
      iconColor: menu.iconColor,
      iconBackgroundColor: menu.iconBackgroundColor,
      actionLabel: menu.actionLabel,
      actionItem: menu.actionItem
    });
  }));
};
var _default = OpenChannelModerationMenu;
exports.default = _default;
//# sourceMappingURL=OpenChannelModerationMenu.js.map