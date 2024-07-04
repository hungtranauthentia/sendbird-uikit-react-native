"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NewMessagesButton = _ref => {
  let {
    newMessages,
    visible,
    onPress
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    select,
    palette,
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (newMessages.length === 0 || !visible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 0.8,
    onPress: onPress,
    style: [styles.container, {
      backgroundColor: select({
        dark: palette.background400,
        light: palette.background50
      })
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    button: true,
    color: colors.primary
  }, STRINGS.GROUP_CHANNEL.LIST_BUTTON_NEW_MSG(newMessages)));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
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
var _default = /*#__PURE__*/_react.default.memo(NewMessagesButton);
exports.default = _default;
//# sourceMappingURL=NewMessagesButton.js.map