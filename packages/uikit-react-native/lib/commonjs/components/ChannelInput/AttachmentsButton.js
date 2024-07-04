"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AttachmentsButton = _ref => {
  let {
    onPress,
    disabled
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: disabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'add',
    size: 24,
    containerStyle: styles.container
  }));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    marginRight: 8,
    padding: 4
  }
});
var _default = AttachmentsButton;
exports.default = _default;
//# sourceMappingURL=AttachmentsButton.js.map