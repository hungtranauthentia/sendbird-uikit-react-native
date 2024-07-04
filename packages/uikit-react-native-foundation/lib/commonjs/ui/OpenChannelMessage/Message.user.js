"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _RegexText = _interopRequireDefault(require("../../components/RegexText"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const UserMessage = props => {
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const {
    onPress,
    onLongPress,
    onPressURL,
    ...rest
  } = props;
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, _extends({
      pressed: pressed
    }, rest), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: color.enabled.textMsg
    }, /*#__PURE__*/_react.default.createElement(_RegexText.default, {
      body3: true,
      color: color.enabled.textMsg,
      patterns: [{
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
            color: colors.primary,
            style: parentProps === null || parentProps === void 0 ? void 0 : parentProps.style
          }), match);
        }
      }]
    }, props.message.message), Boolean(props.message.updatedAt) && /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: color.enabled.textMsgPostfix
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.edited) ?? ' (edited)')));
  });
};
var _default = UserMessage;
exports.default = _default;
//# sourceMappingURL=Message.user.js.map