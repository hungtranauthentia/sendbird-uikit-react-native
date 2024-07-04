import React from 'react';
import { SendingStatus } from '@sendbird/chat/message';
import { getMessageTimeFormat } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import Icon from '../../components/Icon';
import PressBox from '../../components/PressBox';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Avatar from '../Avatar';
import LoadingSpinner from '../LoadingSpinner';
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
  } = useUIKitTheme();
  const color = colors.ui.openChannelMessage.default;
  const renderSendingStatus = () => {
    if (!('sendingStatus' in props.message)) return null;
    switch (props.message.sendingStatus) {
      case SendingStatus.PENDING:
        {
          return /*#__PURE__*/React.createElement(SendingStatusContainer, null, /*#__PURE__*/React.createElement(LoadingSpinner, {
            color: colors.primary,
            size: 16
          }));
        }
      case SendingStatus.FAILED:
        {
          return /*#__PURE__*/React.createElement(SendingStatusContainer, null, /*#__PURE__*/React.createElement(Icon, {
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
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    paddingVertical: grouped ? 5 : 6,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: pressed ? color.pressed.background : color.enabled.background
  }, /*#__PURE__*/React.createElement(Box, {
    marginRight: 12
  }, !grouped && 'sender' in props.message ? /*#__PURE__*/React.createElement(PressBox, {
    onPress: props.onPressAvatar
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: styles.avatar.width,
    uri: props.message.sender.profileUrl
  })) : /*#__PURE__*/React.createElement(Box, {
    style: styles.avatar
  })), /*#__PURE__*/React.createElement(Box, {
    flexShrink: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }, !grouped && 'sender' in props.message && /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Box, {
    marginRight: 4,
    flexShrink: 1
  }, /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    ellipsizeMode: 'middle',
    numberOfLines: 1,
    color: channel.isOperator(props.message.sender.userId) ? color.enabled.textOperator : color.enabled.textSenderName
  }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.senderName) ?? props.message.sender.nickname)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    caption4: true,
    color: color.enabled.textTime
  }, ((_props$strings2 = props.strings) === null || _props$strings2 === void 0 ? void 0 : _props$strings2.sentDate) ?? getMessageTimeFormat(new Date(props.message.createdAt))))), /*#__PURE__*/React.createElement(Box, {
    style: styles.message
  }, children), renderSendingStatus()));
};
const SendingStatusContainer = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row'
  }, /*#__PURE__*/React.createElement(Box, {
    marginTop: 2
  }, children));
};
const styles = createStyleSheet({
  avatar: {
    width: 28
  },
  message: {
    width: '100%'
  }
});
export default MessageContainer;
//# sourceMappingURL=MessageContainer.js.map