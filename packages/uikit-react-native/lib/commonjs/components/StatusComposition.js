"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const StatusComposition = _ref => {
  let {
    children,
    error,
    ErrorComponent,
    LoadingComponent,
    loading
  } = _ref;
  if (loading && LoadingComponent) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, LoadingComponent);
  if (error && ErrorComponent) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ErrorComponent);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};
var _default = StatusComposition;
exports.default = _default;
//# sourceMappingURL=StatusComposition.js.map