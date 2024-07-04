"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _TypedPlaceholder = _interopRequireDefault(require("../../../components/TypedPlaceholder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GroupChannelStatusEmpty = () => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_TypedPlaceholder.default, {
    type: 'no-messages'
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
var _default = GroupChannelStatusEmpty;
exports.default = _default;
//# sourceMappingURL=GroupChannelStatusEmpty.js.map