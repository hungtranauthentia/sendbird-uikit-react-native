"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _RegexText = _interopRequireDefault(require("../../components/RegexText"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MessageBubbleWithText = _ref => {
  let {
    backgroundColor,
    message,
    onPressURL,
    onLongPress,
    strings,
    variant = 'incoming',
    regexTextPatterns = [],
    renderRegexTextChildren = msg => msg.message
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    backgroundColor: backgroundColor,
    style: styles.bubble
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    body3: true,
    color: color.enabled.textMsg,
    suppressHighlighting: true
  }, /*#__PURE__*/_react.default.createElement(_RegexText.default, {
    body3: true,
    color: color.enabled.textMsg,
    patterns: [...regexTextPatterns, {
      regex: _uikitUtils.urlRegexStrict,
      replacer(_ref2) {
        let {
          match,
          parentProps,
          keyPrefix,
          index
        } = _ref2;
        return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({}, parentProps, {
          key: `${keyPrefix}-${index}`,
          onPress: () => onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(match),
          onLongPress: onLongPress,
          style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, styles.urlText]
        }), match);
      }
    }]
  }, renderRegexTextChildren(message)), Boolean(message.updatedAt) && /*#__PURE__*/_react.default.createElement(_Text.default, {
    body3: true,
    color: color.enabled.textEdited
  }, (strings === null || strings === void 0 ? void 0 : strings.edited) ?? ' (edited)')));
};
const styles = (0, _createStyleSheet.default)({
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  urlText: {
    textDecorationLine: 'underline'
  }
});
var _default = MessageBubbleWithText;
exports.default = _default;
//# sourceMappingURL=MessageBubbleWithText.js.map