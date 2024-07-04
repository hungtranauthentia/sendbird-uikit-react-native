"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Divider = _ref => {
  let {
    style,
    space
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style, styles.divider, {
      paddingHorizontal: space
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.inner, {
      backgroundColor: colors.onBackground04
    }]
  }));
};
const styles = (0, _createStyleSheet.default)({
  divider: {
    width: '100%',
    height: 1
  },
  inner: {
    width: '100%',
    height: '100%'
  }
});
var _default = Divider;
exports.default = _default;
//# sourceMappingURL=index.js.map