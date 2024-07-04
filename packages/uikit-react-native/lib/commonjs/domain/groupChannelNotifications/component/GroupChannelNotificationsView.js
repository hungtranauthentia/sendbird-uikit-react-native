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
const GroupChannelNotificationsView = () => {
  const {
    channel
  } = (0, _react.useContext)(_moduleContext.GroupChannelNotificationsContexts.Fragment);
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const turnedOnNotifications = channel.myPushTriggerOption !== _chat.PushTriggerOption.OFF;
  const turnedOnNotificationsOptionAll = [_chat.PushTriggerOption.ALL, _chat.PushTriggerOption.DEFAULT].some(it => it === channel.myPushTriggerOption);
  const turnedOnNotificationsOptionMentionsOnly = channel.myPushTriggerOption === _chat.PushTriggerOption.MENTION_ONLY;
  const toggleNotificationSwitch = async val => {
    if (val) {
      await channel.setMyPushTriggerOption(_chat.PushTriggerOption.ALL);
    } else {
      await channel.setMyPushTriggerOption(_chat.PushTriggerOption.OFF);
    }
    forceUpdate();
  };
  const onPressNotificationsOption = async option => {
    await channel.setMyPushTriggerOption(option);
    forceUpdate();
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    bounces: false,
    contentContainerStyle: styles.container
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    subtitle2: true,
    title: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS,
    description: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS_DESC,
    component: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Switch, {
      value: turnedOnNotifications,
      onChangeValue: toggleNotificationSwitch
    })
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Divider, null), turnedOnNotifications && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Bar, {
    body3: true,
    onPress: () => onPressNotificationsOption(_chat.PushTriggerOption.ALL),
    title: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS_OPTION_ALL,
    component: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      color: turnedOnNotificationsOptionAll ? colors.primary : colors.onBackground03,
      icon: turnedOnNotificationsOptionAll ? 'radio-on' : 'radio-off',
      size: 24
    })
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Divider, null), /*#__PURE__*/_react.default.createElement(Bar, {
    body3: true,
    onPress: () => onPressNotificationsOption(_chat.PushTriggerOption.MENTION_ONLY),
    title: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS_OPTION_MENTION_ONLY,
    component: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      color: turnedOnNotificationsOptionMentionsOnly ? colors.primary : colors.onBackground03,
      icon: turnedOnNotificationsOptionMentionsOnly ? 'radio-on' : 'radio-off',
      size: 24
    })
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Divider, null)));
};
const Bar = _ref => {
  let {
    title,
    onPress,
    description,
    component,
    subtitle2,
    body3
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPress,
    style: styles.barContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: body3,
    subtitle2: subtitle2,
    numberOfLines: 1,
    color: colors.onBackground01,
    style: styles.title
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, component)), Boolean(description) && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: colors.onBackground02,
    style: styles.desc
  }, description));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    paddingHorizontal: 16
  },
  barContainer: {
    paddingVertical: 16
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    marginRight: 8
  },
  desc: {
    marginTop: 8,
    flex: 1
  }
});
var _default = GroupChannelNotificationsView;
exports.default = _default;
//# sourceMappingURL=GroupChannelNotificationsView.js.map