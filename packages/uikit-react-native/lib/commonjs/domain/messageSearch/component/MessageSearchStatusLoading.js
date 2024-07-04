"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _TypedPlaceholder = _interopRequireDefault(require("../../../components/TypedPlaceholder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageSearchStatusLoading = () => {
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_TypedPlaceholder.default, {
    type: 'loading'
  }));
};
var _default = MessageSearchStatusLoading;
exports.default = _default;
//# sourceMappingURL=MessageSearchStatusLoading.js.map