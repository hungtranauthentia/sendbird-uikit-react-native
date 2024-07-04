import React from 'react';
import { Pressable } from 'react-native';
import { getMessageTimeFormat } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Avatar from '../Avatar';
const MessageContainer = props => {
  if (props.variant === 'incoming') {
    return /*#__PURE__*/React.createElement(MessageContainer.Incoming, props);
  } else {
    return /*#__PURE__*/React.createElement(MessageContainer.Outgoing, props);
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
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage.incoming;
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  }, /*#__PURE__*/React.createElement(Box, {
    width: 26,
    marginRight: 12
  }, (message.isFileMessage() || message.isUserMessage()) && !groupedWithNext && /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPressAvatar
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: 26,
    uri: (_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.profileUrl
  }))), /*#__PURE__*/React.createElement(Box, {
    flexShrink: 1
  }, parentMessage, !groupedWithPrev && !message.parentMessage && /*#__PURE__*/React.createElement(Box, {
    marginLeft: 12,
    marginBottom: 4
  }, (message.isFileMessage() || message.isUserMessage()) && /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    color: color.enabled.textSenderName,
    numberOfLines: 1
  }, (strings === null || strings === void 0 ? void 0 : strings.senderName) ?? message.sender.nickname)), /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    alignItems: 'flex-end'
  }, /*#__PURE__*/React.createElement(Box, {
    style: styles.bubble
  }, children), !groupedWithNext && /*#__PURE__*/React.createElement(Box, {
    marginLeft: 4
  }, /*#__PURE__*/React.createElement(Text, {
    caption4: true,
    color: color.enabled.textTime
  }, (strings === null || strings === void 0 ? void 0 : strings.sentDate) ?? getMessageTimeFormat(new Date(message.createdAt)))))));
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
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage.outgoing;
  return /*#__PURE__*/React.createElement(Box, null, parentMessage, /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }, /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  }, sendingStatus && /*#__PURE__*/React.createElement(Box, {
    marginRight: 4
  }, sendingStatus), !groupedWithNext && /*#__PURE__*/React.createElement(Box, {
    marginRight: 4
  }, /*#__PURE__*/React.createElement(Text, {
    caption4: true,
    color: color.enabled.textTime
  }, (strings === null || strings === void 0 ? void 0 : strings.sentDate) ?? getMessageTimeFormat(new Date(message.createdAt))))), /*#__PURE__*/React.createElement(Box, {
    style: styles.bubble
  }, children)));
};
const styles = createStyleSheet({
  bubble: {
    maxWidth: 240,
    overflow: 'hidden',
    flexShrink: 1
  }
});
export default MessageContainer;
//# sourceMappingURL=MessageContainer.js.map