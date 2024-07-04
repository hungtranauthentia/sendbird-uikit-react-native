"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _UIKitThemeContext = _interopRequireDefault(require("./UIKitThemeContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useUIKitTheme = () => {
  const context = (0, _react.useContext)(_UIKitThemeContext.default);
  if (!context) throw Error('UIKitThemeContext is not provided');
  return context;
};
var _default = useUIKitTheme;
exports.default = _default;
//# sourceMappingURL=useUIKitTheme.js.map