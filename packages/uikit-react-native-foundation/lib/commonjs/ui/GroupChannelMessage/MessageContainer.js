"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Avatar = _interopRequireDefault(require("../Avatar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageContainer = props => {
  if (props.variant === 'incoming') {
    return /*#__PURE__*/_react.default.createElement(MessageContainer.Incoming, props);
  } else {
    return /*#__PURE__*/_react.default.createElement(MessageContainer.Outgoing, props);
  }
};
MessageContainer.Incoming = function MessageContainerIncoming(_ref) {
  var _message$sender;
  let {
    children,
    groupedWithNext,
    groupedWithPrev,
    message,
    onPressAvatar,
    strings,
    parentMessage
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage.incoming;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    width: 26,
    marginRight: 12
  }, (message.isFileMessage() || message.isUserMessage()) && !groupedWithNext && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPressAvatar
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    size: 26,
    uri: (_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.profileUrl
  }))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexShrink: 1
  }, parentMessage, !groupedWithPrev && !message.parentMessage && /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginLeft: 12,
    marginBottom: 4
  }, (message.isFileMessage() || message.isUserMessage()) && /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption1: true,
    color: color.enabled.textSenderName,
    numberOfLines: 1
  }, (strings === null || strings === void 0 ? void 0 : strings.senderName) ?? message.sender.nickname)), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    alignItems: 'flex-end'
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.bubble
  }, children), !groupedWithNext && /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginLeft: 4
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption4: true,
    color: color.enabled.textTime
  }, (strings === null || strings === void 0 ? void 0 : strings.sentDate) ?? (0, _uikitUtils.getMessageTimeFormat)(new Date(message.createdAt)))))));
};
MessageContainer.Outgoing = function MessageContainerOutgoing(_ref2) {
  let {
    children,
    message,
    groupedWithNext,
    strings,
    sendingStatus,
    parentMessage
  } = _ref2;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage.outgoing;
  return /*#__PURE__*/_react.default.createElement(_Box.default, null, parentMessage, /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  }, sendingStatus && /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginRight: 4
  }, sendingStatus), !groupedWithNext && /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginRight: 4
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption4: true,
    color: color.enabled.textTime
  }, (strings === null || strings === void 0 ? void 0 : strings.sentDate) ?? (0, _uikitUtils.getMessageTimeFormat)(new Date(message.createdAt))))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.bubble
  }, children)));
};
const styles = (0, _createStyleSheet.default)({
  bubble: {
    maxWidth: 240,
    overflow: 'hidden',
    flexShrink: 1
  }
});
var _default = MessageContainer;
exports.default = _default;
//# sourceMappingURL=MessageContainer.js.map