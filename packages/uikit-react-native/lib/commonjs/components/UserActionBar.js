"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserActionBar = _ref => {
  let {
    muted,
    uri,
    name,
    disabled,
    label,
    onPressActionMenu,
    onPressAvatar
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const iconColor = (0, _uikitUtils.conditionChaining)([disabled], [colors.onBackground04, colors.onBackground01]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPressAvatar,
    style: styles.avatar
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
    muted: muted,
    size: 36,
    uri: uri
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.infoContainer, {
      borderBottomColor: colors.onBackground04
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    subtitle2: true,
    numberOfLines: 1,
    style: styles.name,
    color: colors.onBackground01
  }, name), Boolean(label) && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body2: true,
    color: colors.onBackground02,
    style: styles.label
  }, label), Boolean(onPressActionMenu) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressActionMenu,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: iconColor,
    size: 24,
    icon: 'more',
    containerStyle: styles.iconContainer
  }))));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56
  },
  avatar: {
    marginLeft: 16,
    marginRight: 16
  },
  label: {
    marginRight: 4
  },
  infoContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 12,
    borderBottomWidth: 1
  },
  iconContainer: {
    padding: 4
  },
  name: {
    flex: 1,
    marginRight: 8
  }
});
var _default = UserActionBar;
exports.default = _default;
//# sourceMappingURL=UserActionBar.js.map