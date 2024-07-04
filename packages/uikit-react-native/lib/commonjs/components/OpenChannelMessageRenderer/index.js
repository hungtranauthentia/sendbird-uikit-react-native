"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _SBUUtils = _interopRequireDefault(require("../../libs/SBUUtils"));
var _OpenChannelMessageDateSeparator = _interopRequireDefault(require("./OpenChannelMessageDateSeparator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenChannelMessageRenderer = _ref => {
  let {
    channel,
    message,
    onPress,
    onLongPress,
    onShowUserProfile,
    enableMessageGrouping,
    prevMessage,
    nextMessage
  } = _ref;
  const {
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    mediaService
  } = (0, _useContext.usePlatformService)();
  const {
    groupWithPrev
  } = (0, _uikitUtils.calcMessageGrouping)(Boolean(enableMessageGrouping), message, prevMessage, nextMessage);
  const messageProps = {
    channel,
    onPress,
    onLongPress,
    onPressURL: url => _SBUUtils.default.openURL(url),
    onPressAvatar: () => 'sender' in message && (onShowUserProfile === null || onShowUserProfile === void 0 ? void 0 : onShowUserProfile(message.sender, {
      hideMessageButton: true
    })),
    grouped: groupWithPrev,
    strings: {
      edited: STRINGS.OPEN_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX,
      senderName: 'sender' in message && message.sender.nickname || STRINGS.LABELS.USER_NO_NAME,
      sentDate: STRINGS.OPEN_CHANNEL.MESSAGE_BUBBLE_TIME(message),
      fileName: message.isFileMessage() ? STRINGS.OPEN_CHANNEL.MESSAGE_BUBBLE_FILE_TITLE(message) : '',
      unknownTitle: STRINGS.OPEN_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_TITLE(message),
      unknownDescription: STRINGS.OPEN_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_DESC(message)
    }
  };
  const renderMessage = () => {
    switch ((0, _uikitUtils.getMessageType)(message)) {
      case 'admin':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.Admin, _extends({
            message: message
          }, messageProps));
        }
      case 'user':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.User, _extends({
            message: message
          }, messageProps));
        }
      case 'user.opengraph':
        {
          if (sbOptions.uikitWithAppInfo.openChannel.channel.enableOgtag) {
            return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.OpenGraphUser, _extends({
              message: message
            }, messageProps));
          } else {
            return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.User, _extends({
              message: message
            }, messageProps));
          }
        }
      case 'file':
      case 'file.voice':
      case 'file.audio':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.File, _extends({
            message: message
          }, messageProps));
        }
      case 'file.image':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.ImageFile, _extends({
            message: message
          }, messageProps));
        }
      case 'file.video':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.VideoFile, _extends({
            message: message,
            fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
              url: uri,
              timeMills: 1000
            })
          }, messageProps));
        }
      case 'unknown':
      default:
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelMessage.Unknown, _extends({
            message: message
          }, messageProps));
        }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, null, /*#__PURE__*/_react.default.createElement(_OpenChannelMessageDateSeparator.default, {
    message: message,
    prevMessage: prevMessage
  }), renderMessage());
};
var _default = /*#__PURE__*/_react.default.memo(OpenChannelMessageRenderer);
exports.default = _default;
//# sourceMappingURL=index.js.map