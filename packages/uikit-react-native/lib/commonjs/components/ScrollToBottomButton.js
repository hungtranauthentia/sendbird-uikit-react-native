"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ScrollToBottomButton = _ref => {
  let {
    visible,
    onPress
  } = _ref;
  const {
    palette,
    select
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (!visible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    activeOpacity: 0.8,
    disabled: !visible,
    style: [styles.container, {
      backgroundColor: select({
        dark: palette.background400,
        light: palette.background50
      })
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'chevron-down',
    size: 22
  }));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    padding: 8,
    borderRadius: 24,
    ..._reactNative.Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3
      }
    })
  }
});
var _default = /*#__PURE__*/_react.default.memo(ScrollToBottomButton);
exports.default = _default;
//# sourceMappingURL=ScrollToBottomButton.js.map