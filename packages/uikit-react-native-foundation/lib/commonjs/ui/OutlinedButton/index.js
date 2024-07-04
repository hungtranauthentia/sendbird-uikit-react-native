"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OutlinedButton = _ref => {
  let {
    children,
    onPress,
    containerStyle
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPress,
    style: [styles.outlinedButton, {
      borderColor: colors.onBackground01
    }, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    button: true,
    color: colors.onBackground01,
    numberOfLines: 1,
    style: styles.outlinedButtonText
  }, children));
};
const styles = (0, _createStyleSheet.default)({
  outlinedButton: {
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outlinedButtonText: {
    textAlign: 'center',
    width: '100%'
  }
});
var _default = OutlinedButton;
exports.default = _default;
//# sourceMappingURL=index.js.map