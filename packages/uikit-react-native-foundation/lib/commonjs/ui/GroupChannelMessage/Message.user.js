"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("../../components/Box"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageBubbleWithText = _interopRequireDefault(require("./MessageBubbleWithText"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, props, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      backgroundColor: pressed ? color.pressed.background : color.enabled.background,
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_MessageBubbleWithText.default, props), props.children);
  }));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    overflow: 'hidden',
    borderRadius: 16
  }
});
var _default = UserMessage;
exports.default = _default;
//# sourceMappingURL=Message.user.js.map