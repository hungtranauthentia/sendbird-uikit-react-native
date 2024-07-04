"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _chat = require("@sendbird/chat");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let WARN_onPressMenuNotification = false;
let WARN_onPressMenuSearchInChannel = false;
const GroupChannelSettingsMenu = _ref => {
  let {
    onPressMenuModeration,
    onPressMenuMembers,
    onPressMenuSearchInChannel,
    onPressMenuLeaveChannel,
    onPressMenuNotification,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    sdk,
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    channel
  } = (0, _react.useContext)(_moduleContext.GroupChannelSettingsContexts.Fragment);
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (__DEV__ && !WARN_onPressMenuNotification && !onPressMenuNotification && sbOptions.uikit.groupChannel.channel.enableMention) {
    _uikitUtils.Logger.warn('If you are using mention, make sure to pass the `onPressMenuNotification` prop');
    WARN_onPressMenuNotification = true;
  }
  if (__DEV__ && !WARN_onPressMenuSearchInChannel && !onPressMenuSearchInChannel && sbOptions.uikitWithAppInfo.groupChannel.setting.enableMessageSearch) {
    _uikitUtils.Logger.warn('If you are using message search, make sure to pass the `onPressMenuSearchInChannel` prop');
    WARN_onPressMenuSearchInChannel = true;
  }
  const toggleNotification = async () => {
    if (channel.myPushTriggerOption === 'off') {
      await channel.setMyPushTriggerOption(_chat.PushTriggerOption.DEFAULT);
    } else {
      await channel.setMyPushTriggerOption(_chat.PushTriggerOption.OFF);
    }
  };
  const {
    onPressNotificationMenu,
    actionLabelNotificationMenu,
    actionItemNotificationMenu
  } = (0, _uikitUtils.useIIFE)(() => {
    const getNotificationsLabel = () => {
      switch (channel.myPushTriggerOption) {
        case _chat.PushTriggerOption.ALL:
        case _chat.PushTriggerOption.DEFAULT:
          return STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION_LABEL_ON;
        case _chat.PushTriggerOption.OFF:
          return STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION_LABEL_OFF;
        case _chat.PushTriggerOption.MENTION_ONLY:
          return STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION_LABEL_MENTION_ONLY;
      }
    };
    return {
      actionLabelNotificationMenu: getNotificationsLabel(),
      actionItemNotificationMenu: (0, _uikitUtils.conditionChaining)([sbOptions.uikit.groupChannel.channel.enableMention], [/*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'chevron-right',
        color: colors.onBackground01
      }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Switch, {
        value: channel.myPushTriggerOption !== 'off',
        onChangeValue: toggleNotification
      })]),
      onPressNotificationMenu: () => {
        if (sbOptions.uikit.groupChannel.channel.enableMention) onPressMenuNotification === null || onPressMenuNotification === void 0 ? void 0 : onPressMenuNotification();else toggleNotification();
      }
    };
  });
  const defaultMenuItems = [{
    icon: 'moderation',
    visible: channel.myRole === 'operator',
    name: STRINGS.GROUP_CHANNEL_SETTINGS.MENU_MODERATION,
    onPress: () => onPressMenuModeration(),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'notifications',
    name: STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION,
    onPress: onPressNotificationMenu,
    actionLabel: actionLabelNotificationMenu,
    actionItem: actionItemNotificationMenu
  }, {
    icon: 'members',
    name: STRINGS.GROUP_CHANNEL_SETTINGS.MENU_MEMBERS,
    onPress: () => onPressMenuMembers(),
    actionLabel: String(channel.memberCount),
    actionItem: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }];
  if (sbOptions.uikitWithAppInfo.groupChannel.setting.enableMessageSearch && !channel.isEphemeral) {
    defaultMenuItems.push({
      icon: 'search',
      name: STRINGS.GROUP_CHANNEL_SETTINGS.MENU_SEARCH,
      onPress: () => onPressMenuSearchInChannel === null || onPressMenuSearchInChannel === void 0 ? void 0 : onPressMenuSearchInChannel()
    });
  }
  defaultMenuItems.push({
    icon: 'leave',
    iconColor: colors.error,
    name: STRINGS.GROUP_CHANNEL_SETTINGS.MENU_LEAVE_CHANNEL,
    onPress: () => {
      channel.leave().then(() => {
        onPressMenuLeaveChannel();
        sdk.clearCachedMessages([channel.url]).catch();
      });
    }
  });
  const menuItems = menuItemsCreator(defaultMenuItems);
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
var _default = GroupChannelSettingsMenu;
exports.default = _default;
//# sourceMappingURL=GroupChannelSettingsMenu.js.map