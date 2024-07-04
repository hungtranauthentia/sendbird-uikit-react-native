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
const DialogBox = _ref => {
  let {
    style,
    children
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: colors.ui.dialog.default.none.background
    }, style]
  }, children);
};
const styles = (0, _createStyleSheet.default)({
  container: {
    width: 280,
    borderRadius: 4
  }
});
var _default = DialogBox;
exports.default = _default;
//# sourceMappingURL=DialogBox.js.map