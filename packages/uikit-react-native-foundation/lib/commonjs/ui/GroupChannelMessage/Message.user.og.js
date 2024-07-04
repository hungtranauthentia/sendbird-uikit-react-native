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
var _MessageOpenGraph = _interopRequireDefault(require("./MessageOpenGraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenGraphUserMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    palette,
    select,
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage[variant];
  const containerBackgroundColor = select({
    dark: palette.background400,
    light: palette.background100
  });
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, props, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      backgroundColor: containerBackgroundColor,
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_MessageBubbleWithText.default, _extends({
      backgroundColor: pressed ? color.pressed.background : color.enabled.background
    }, props)), props.message.ogMetaData && /*#__PURE__*/_react.default.createElement(_MessageOpenGraph.default, {
      variant: variant,
      ogMetaData: props.message.ogMetaData,
      onLongPress: props.onLongPress,
      onPressURL: props.onPressURL
    }), props.children);
  }));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  }
});
var _default = OpenGraphUserMessage;
exports.default = _default;
//# sourceMappingURL=Message.user.og.js.map