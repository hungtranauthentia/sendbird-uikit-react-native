"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OpenChannelMessageDateSeparator = _ref => {
  let {
    message,
    prevMessage
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const sameDay = (0, _isSameDay.default)(message.createdAt, (prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.createdAt) ?? 0);
  if (sameDay) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.view, {
      backgroundColor: colors.ui.dateSeparator.default.none.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption1: true,
    color: colors.ui.dateSeparator.default.none.text
  }, STRINGS.OPEN_CHANNEL.LIST_DATE_SEPARATOR(new Date(message.createdAt)))));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    alignItems: 'center',
    marginVertical: 16
  },
  view: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10
  }
});
var _default = OpenChannelMessageDateSeparator;
exports.default = _default;
//# sourceMappingURL=OpenChannelMessageDateSeparator.js.map