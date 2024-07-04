"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChannelFrozenBanner = _ref => {
  let {
    text = 'Channel is frozen',
    backgroundColor,
    textColor,
    style
  } = _ref;
  const {
    palette
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: 'none',
    style: [styles.container, {
      backgroundColor: backgroundColor ?? palette.information
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption2: true,
    color: textColor ?? palette.onBackgroundLight01
  }, text));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 4
  }
});
var _default = ChannelFrozenBanner;
exports.default = _default;
//# sourceMappingURL=index.js.map