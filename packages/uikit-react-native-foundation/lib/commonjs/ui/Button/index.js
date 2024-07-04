"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Button = _ref => {
  let {
    icon,
    variant = 'contained',
    buttonColor,
    contentColor,
    disabled,
    onPress,
    style,
    children
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const getStateColor = (pressed, disabled) => {
    const stateColors = colors.ui.button[variant];
    if (disabled) return stateColors.disabled;
    if (pressed) return stateColors.pressed;
    return stateColors.enabled;
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    disabled: disabled,
    onPress: onPress,
    style: _ref2 => {
      let {
        pressed
      } = _ref2;
      const stateColor = getStateColor(pressed, disabled);
      return [{
        backgroundColor: buttonColor ?? stateColor.background
      }, styles.container, style];
    }
  }, _ref3 => {
    let {
      pressed
    } = _ref3;
    const stateColor = getStateColor(pressed, disabled);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon && /*#__PURE__*/_react.default.createElement(_Icon.default, {
      size: 24,
      icon: icon,
      color: contentColor ?? stateColor.content,
      containerStyle: styles.icon
    }), /*#__PURE__*/_react.default.createElement(_Text.default, {
      button: true,
      color: contentColor ?? stateColor.content,
      style: styles.text
    }, children));
  });
};
const styles = (0, _createStyleSheet.default)({
  container: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginVertical: -4,
    marginRight: 8
  },
  text: {}
});
var _default = Button;
exports.default = _default;
//# sourceMappingURL=index.js.map