"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizationProvider = exports.LocalizationContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LocalizationContext = /*#__PURE__*/_react.default.createContext(null);
exports.LocalizationContext = LocalizationContext;
const LocalizationProvider = _ref => {
  let {
    children,
    stringSet
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(LocalizationContext.Provider, {
    value: {
      STRINGS: stringSet
    }
  }, children);
};
exports.LocalizationProvider = LocalizationProvider;
//# sourceMappingURL=LocalizationCtx.js.map