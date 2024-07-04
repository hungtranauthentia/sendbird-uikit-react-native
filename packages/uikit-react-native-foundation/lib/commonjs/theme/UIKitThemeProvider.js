"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _LightUIKitTheme = _interopRequireDefault(require("./LightUIKitTheme"));
var _UIKitThemeContext = _interopRequireDefault(require("./UIKitThemeContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UIKitThemeProvider = _ref => {
  let {
    children,
    theme = _LightUIKitTheme.default
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_UIKitThemeContext.default.Provider, {
    value: theme
  }, children);
};
var _default = UIKitThemeProvider;
exports.default = _default;
//# sourceMappingURL=UIKitThemeProvider.js.map