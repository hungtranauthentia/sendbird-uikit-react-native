"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("../../components/Box"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnknownMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage[variant];
  const titleColor = variant === 'incoming' ? colors.onBackground01 : colors.onBackgroundReverse01;
  const descColor = variant === 'incoming' ? colors.onBackground02 : colors.onBackgroundReverse02;
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, props, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    var _props$strings, _props$strings2;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      style: styles.bubble,
      backgroundColor: pressed ? color.pressed.background : color.enabled.background
    }, /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: titleColor
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.unknownTitle) ?? '(Unknown message type)'), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: descColor
    }, ((_props$strings2 = props.strings) === null || _props$strings2 === void 0 ? void 0 : _props$strings2.unknownDescription) ?? 'Cannot read this message.'));
  }));
};
const styles = (0, _createStyleSheet.default)({
  bubble: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  }
});
var _default = UnknownMessage;
exports.default = _default;
//# sourceMappingURL=Message.unknown.js.map