import React from 'react';
import { useMessageOutgoingStatus } from '@sendbird/uikit-chat-hooks';
import { Icon, LoadingSpinner, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useSendbirdChat } from '../../hooks/useContext';
const SIZE = 16;
const GroupChannelMessageOutgoingStatus = _ref => {
  let {
    channel,
    message,
    style
  } = _ref;
  const {
    sdk
  } = useSendbirdChat();
  const {
    colors
  } = useUIKitTheme();
  const outgoingStatus = useMessageOutgoingStatus(sdk, channel, message);
  if (!message.isUserMessage() && !message.isFileMessage()) return null;
  if (channel.isEphemeral) return null;
  if (outgoingStatus === 'PENDING') {
    return /*#__PURE__*/React.createElement(LoadingSpinner, {
      size: SIZE,
      style: style
    });
  }
  if (outgoingStatus === 'FAILED') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'error',
      size: SIZE,
      color: colors.error,
      style: style
    });
  }
  if (outgoingStatus === 'READ') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'done-all',
      size: SIZE,
      color: colors.secondary,
      style: style
    });
  }
  if (outgoingStatus === 'UNREAD' || outgoingStatus === 'DELIVERED') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'done-all',
      size: SIZE,
      color: colors.onBackground03,
      style: style
    });
  }
  if (outgoingStatus === 'UNDELIVERED') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'done',
      size: SIZE,
      color: colors.onBackground03,
      style: style
    });
  }
  return null;
};
export default /*#__PURE__*/React.memo(GroupChannelMessageOutgoingStatus);
//# sourceMappingURL=GroupChannelMessageOutgoingStatus.js.map