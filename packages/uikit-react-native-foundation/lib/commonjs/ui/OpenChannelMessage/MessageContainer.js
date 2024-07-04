"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _message = require("@sendbird/chat/message");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Avatar = _interopRequireDefault(require("../Avatar"));
var _LoadingSpinner = _interopRequireDefault(require("../LoadingSpinner"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageContainer = _ref => {
  var _props$strings, _props$strings2;
  let {
    children,
    channel,
    grouped,
    pressed,
    ...props
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.openChannelMessage.default;
  const renderSendingStatus = () => {
    if (!('sendingStatus' in props.message)) return null;
    switch (props.message.sendingStatus) {
      case _message.SendingStatus.PENDING:
        {
          return /*#__PURE__*/_react.default.createElement(SendingStatusContainer, null, /*#__PURE__*/_react.default.createElement(_LoadingSpinner.default, {
            color: colors.primary,
            size: 16
          }));
        }
      case _message.SendingStatus.FAILED:
        {
          return /*#__PURE__*/_react.default.createElement(SendingStatusContainer, null, /*#__PURE__*/_react.default.createElement(_Icon.default, {
            icon: 'error',
            color: colors.error,
            size: 16
          }));
        }
      default:
        {
          return null;
        }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    paddingVertical: grouped ? 5 : 6,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: pressed ? color.pressed.background : color.enabled.background
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginRight: 12
  }, !grouped && 'sender' in props.message ? /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: props.onPressAvatar
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    size: styles.avatar.width,
    uri: props.message.sender.profileUrl
  })) : /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.avatar
  })), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexShrink: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }, !grouped && 'sender' in props.message && /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginRight: 4,
    flexShrink: 1
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption1: true,
    ellipsizeMode: 'middle',
    numberOfLines: 1,
    color: channel.isOperator(props.message.sender.userId) ? color.enabled.textOperator : color.enabled.textSenderName
  }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.senderName) ?? props.message.sender.nickname)), /*#__PURE__*/_react.default.createElement(_Box.default, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption4: true,
    color: color.enabled.textTime
  }, ((_props$strings2 = props.strings) === null || _props$strings2 === void 0 ? void 0 : _props$strings2.sentDate) ?? (0, _uikitUtils.getMessageTimeFormat)(new Date(props.message.createdAt))))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.message
  }, children), renderSendingStatus()));
};
const SendingStatusContainer = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row'
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginTop: 2
  }, children));
};
const styles = (0, _createStyleSheet.default)({
  avatar: {
    width: 28
  },
  message: {
    width: '100%'
  }
});
var _default = MessageContainer;
exports.default = _default;
//# sourceMappingURL=MessageContainer.js.map