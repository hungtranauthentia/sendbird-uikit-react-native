"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _constants = require("../../../constants");
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OpenChannelSettingsMenu = _ref => {
  let {
    onPressMenuModeration,
    onPressMenuParticipants,
    onPressMenuDeleteChannel,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    currentUser,
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const {
    channel
  } = (0, _react.useContext)(_moduleContext.OpenChannelSettingsContexts.Fragment);
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('OpenChannelSettingsMenu');
  const onChannelUpdated = eventChannel => {
    if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
    forceUpdate();
  };
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
    onChannelChanged: onChannelUpdated,
    onChannelParticipantCountChanged: onChannelUpdated
  }, 'open');
  const menuItems = menuItemsCreator([{
    icon: 'moderation',
    visible: channel.isOperator((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? _constants.UNKNOWN_USER_ID),
    name: STRINGS.OPEN_CHANNEL_SETTINGS.MENU_MODERATION,
    onPress: () => onPressMenuModeration(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'members',
    name: STRINGS.OPEN_CHANNEL_SETTINGS.MENU_PARTICIPANTS,
    onPress: () => onPressMenuParticipants(),
    actionLabel: String(channel.participantCount),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'leave',
    iconColor: colors.error,
    name: STRINGS.OPEN_CHANNEL_SETTINGS.MENU_DELETE_CHANNEL,
    onPress: () => {
      alert({
        title: STRINGS.OPEN_CHANNEL_SETTINGS.DIALOG_CHANNEL_DELETE_CONFIRM_TITLE,
        buttons: [{
          text: STRINGS.OPEN_CHANNEL_SETTINGS.DIALOG_CHANNEL_DELETE_CONFIRM_CANCEL
        }, {
          text: STRINGS.OPEN_CHANNEL_SETTINGS.DIALOG_CHANNEL_DELETE_CONFIRM_OK,
          style: 'destructive',
          onPress: () => {
            channel.delete().then(() => onPressMenuDeleteChannel());
          }
        }]
      });
    }
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
var _default = OpenChannelSettingsMenu;
exports.default = _default;
//# sourceMappingURL=OpenChannelSettingsMenu.js.map