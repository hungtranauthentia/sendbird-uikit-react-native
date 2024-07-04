"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AvatarIcon = _ref => {
  let {
    size = 56,
    icon,
    containerStyle,
    backgroundColor
  } = _ref;
  const {
    colors,
    palette
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: backgroundColor ?? palette.background300
    }, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: icon,
    size: size / 2,
    color: colors.onBackgroundReverse01
  }));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
var _default = AvatarIcon;
exports.default = _default;
//# sourceMappingURL=AvatarIcon.js.map