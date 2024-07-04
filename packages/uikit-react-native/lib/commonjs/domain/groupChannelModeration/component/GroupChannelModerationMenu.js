"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelModerationMenu = _ref => {
  let {
    onPressMenuBannedUsers,
    onPressMenuMutedMembers,
    onPressMenuOperators,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    channel
  } = (0, _react.useContext)(_moduleContext.GroupChannelModerationContexts.Fragment);
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const [isFrozen, setIsFrozen] = (0, _react.useState)(() => channel.isFrozen);
  const toggleFreeze = async () => {
    if (channel.isFrozen) {
      await channel.unfreeze();
    } else {
      await channel.freeze();
    }
    setIsFrozen(channel.isFrozen);
  };
  const menuItems = menuItemsCreator([{
    icon: 'operator',
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_OPERATORS,
    onPress: () => onPressMenuOperators(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'mute',
    visible: !channel.isBroadcast,
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_MUTED_MEMBERS,
    onPress: () => onPressMenuMutedMembers(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'ban',
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_BANNED_USERS,
    onPress: () => onPressMenuBannedUsers(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'freeze',
    visible: !channel.isBroadcast,
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_FREEZE_CHANNEL,
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Switch, {
      value: isFrozen,
      onChangeValue: toggleFreeze
    }),
    onPress: toggleFreeze
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
var _default = GroupChannelModerationMenu;
exports.default = _default;
//# sourceMappingURL=GroupChannelModerationMenu.js.map