"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProviderLayout = _ref => {
  let {
    children
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.view, {
      backgroundColor: colors.background
    }]
  }, children);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  view: {
    flex: 1
  }
});
var _default = ProviderLayout;
exports.default = _default;
//# sourceMappingURL=ProviderLayout.js.map