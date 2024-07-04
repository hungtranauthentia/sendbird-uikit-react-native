function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Box, OpenChannelMessage } from '@sendbird/uikit-react-native-foundation';
import { calcMessageGrouping, getMessageType } from '@sendbird/uikit-utils';
import { useLocalization, usePlatformService, useSendbirdChat } from '../../hooks/useContext';
import SBUUtils from '../../libs/SBUUtils';
import OpenChannelMessageDateSeparator from './OpenChannelMessageDateSeparator';
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
  } = useSendbirdChat();
  const {
    STRINGS
  } = useLocalization();
  const {
    mediaService
  } = usePlatformService();
  const {
    groupWithPrev
  } = calcMessageGrouping(Boolean(enableMessageGrouping), message, prevMessage, nextMessage);
  const messageProps = {
    channel,
    onPress,
    onLongPress,
    onPressURL: url => SBUUtils.openURL(url),
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
    switch (getMessageType(message)) {
      case 'admin':
        {
          return /*#__PURE__*/React.createElement(OpenChannelMessage.Admin, _extends({
            message: message
          }, messageProps));
        }
      case 'user':
        {
          return /*#__PURE__*/React.createElement(OpenChannelMessage.User, _extends({
            message: message
          }, messageProps));
        }
      case 'user.opengraph':
        {
          if (sbOptions.uikitWithAppInfo.openChannel.channel.enableOgtag) {
            return /*#__PURE__*/React.createElement(OpenChannelMessage.OpenGraphUser, _extends({
              message: message
            }, messageProps));
          } else {
            return /*#__PURE__*/React.createElement(OpenChannelMessage.User, _extends({
              message: message
            }, messageProps));
          }
        }
      case 'file':
      case 'file.voice':
      case 'file.audio':
        {
          return /*#__PURE__*/React.createElement(OpenChannelMessage.File, _extends({
            message: message
          }, messageProps));
        }
      case 'file.image':
        {
          return /*#__PURE__*/React.createElement(OpenChannelMessage.ImageFile, _extends({
            message: message
          }, messageProps));
        }
      case 'file.video':
        {
          return /*#__PURE__*/React.createElement(OpenChannelMessage.VideoFile, _extends({
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
          return /*#__PURE__*/React.createElement(OpenChannelMessage.Unknown, _extends({
            message: message
          }, messageProps));
        }
    }
  };
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(OpenChannelMessageDateSeparator, {
    message: message,
    prevMessage: prevMessage
  }), renderMessage());
};
export default /*#__PURE__*/React.memo(OpenChannelMessageRenderer);
//# sourceMappingURL=index.js.map