"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Divider = _interopRequireDefault(require("../../components/Divider"));
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MenuBar = _ref => {
  let {
    variant = 'default',
    disabled,
    visible = true,
    onPress,
    name,
    icon,
    iconColor,
    iconBackgroundColor,
    actionLabel,
    actionItem = null
  } = _ref;
  const {
    palette,
    colors
  } = (0, _useUIKitTheme.default)();
  if (!visible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    disabled: disabled,
    onPress: onPress,
    style: styles.container
  }, icon && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: icon,
    size: variant === 'contained' ? 16 : 24,
    color: (0, _uikitUtils.conditionChaining)([variant === 'contained', iconColor], [palette.background50, iconColor, colors.primary]),
    containerStyle: [styles.icon, variant === 'contained' && styles.containedIcon, variant === 'contained' && {
      backgroundColor: iconBackgroundColor ?? palette.background400
    }]
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    subtitle2: true,
    numberOfLines: 1,
    style: styles.name
  }, name), Boolean(actionLabel) && /*#__PURE__*/_react.default.createElement(_Text.default, {
    subtitle2: true,
    numberOfLines: 1,
    color: colors.onBackground02,
    style: styles.actionLabel
  }, actionLabel), actionItem), /*#__PURE__*/_react.default.createElement(_Divider.default, null));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    flex: 1,
    marginRight: 8
  },
  icon: {
    marginRight: 16
  },
  containedIcon: {
    borderRadius: 24,
    padding: 4
  },
  actionLabel: {
    marginRight: 4
  }
});
var _default = MenuBar;
exports.default = _default;
//# sourceMappingURL=index.js.map