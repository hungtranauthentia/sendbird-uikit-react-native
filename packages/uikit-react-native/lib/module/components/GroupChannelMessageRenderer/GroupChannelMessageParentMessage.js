import React, { useContext, useEffect, useState } from 'react';
import { Box, Icon, ImageWithPlaceholder, PressBox, Text, VideoThumbnail, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getFileIconFromMessageType, getMessageType, getThumbnailUriFromFileMessage, truncate, useIIFE } from '@sendbird/uikit-utils';
import { GroupChannelContexts } from '../../domain/groupChannel/module/moduleContext';
import { useLocalization, usePlatformService, useSendbirdChat } from '../../hooks/useContext';
const GroupChannelMessageParentMessage = _ref => {
  let {
    variant,
    channel,
    message,
    childMessage,
    onPress
  } = _ref;
  const {
    currentUser
  } = useSendbirdChat();
  const groupChannelPubSub = useContext(GroupChannelContexts.PubSub);
  const {
    select,
    colors,
    palette
  } = useUIKitTheme();
  const {
    STRINGS
  } = useLocalization();
  const {
    mediaService
  } = usePlatformService();
  const [parentMessage, setParentMessage] = useState(() => message);
  const type = getMessageType(parentMessage);
  useEffect(() => {
    return groupChannelPubSub.subscribe(_ref2 => {
      let {
        type,
        data
      } = _ref2;
      if (type === 'MESSAGES_UPDATED') {
        const updatedParent = data.messages.find(it => {
          return it.messageId === parentMessage.messageId;
        });
        if (updatedParent) setParentMessage(updatedParent);
      }
    });
  }, []);
  const renderMessageWithText = message => {
    return /*#__PURE__*/React.createElement(Box, {
      style: styles.bubbleContainer,
      backgroundColor: select({
        light: palette.background100,
        dark: palette.background400
      })
    }, /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: colors.onBackground03,
      suppressHighlighting: true,
      numberOfLines: 2,
      ellipsizeMode: 'tail'
    }, message));
  };
  const renderFileMessageAsVideoThumbnail = url => {
    return /*#__PURE__*/React.createElement(VideoThumbnail, {
      style: styles.image,
      iconSize: 18,
      source: url,
      fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
        url: uri,
        timeMills: 1000
      })
    });
  };
  const renderFileMessageAsPreview = url => {
    return /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
      style: styles.image,
      source: {
        uri: url
      }
    });
  };
  const renderFileMessageAsDownloadable = name => {
    return /*#__PURE__*/React.createElement(Box, {
      style: styles.bubbleContainer,
      backgroundColor: select({
        light: palette.background100,
        dark: palette.background400
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      icon: getFileIconFromMessageType(type),
      size: 16,
      color: colors.onBackground03,
      containerStyle: styles.fileIcon
    }), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: colors.onBackground03,
      numberOfLines: 1,
      ellipsizeMode: 'middle'
    }, truncate(name, {
      mode: 'mid',
      maxLen: 20
    })));
  };
  const parentMessageComponent = useIIFE(() => {
    if (channel.messageOffsetTimestamp > parentMessage.createdAt) {
      return renderMessageWithText(STRINGS.LABELS.MESSAGE_UNAVAILABLE);
    }
    switch (type) {
      case 'user':
      case 'user.opengraph':
        {
          return renderMessageWithText(parentMessage.message);
        }
      case 'file':
      case 'file.audio':
        {
          return renderFileMessageAsDownloadable(parentMessage.name);
        }
      case 'file.video':
        {
          return renderFileMessageAsVideoThumbnail(getThumbnailUriFromFileMessage(parentMessage));
        }
      case 'file.image':
        {
          return renderFileMessageAsPreview(getThumbnailUriFromFileMessage(parentMessage));
        }
      case 'file.voice':
        {
          return renderMessageWithText(STRINGS.LABELS.VOICE_MESSAGE);
        }
      default:
        {
          return null;
        }
    }
  });
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    alignItems: variant === 'outgoing' ? 'flex-end' : 'flex-start',
    paddingLeft: variant === 'outgoing' ? 0 : 12,
    paddingRight: variant === 'outgoing' ? 12 : 0
  }, /*#__PURE__*/React.createElement(PressBox, {
    onPress: () => onPress === null || onPress === void 0 ? void 0 : onPress(parentMessage),
    style: styles.senderLabel
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'reply-filled',
    size: 13,
    color: colors.onBackground03,
    containerStyle: {
      marginRight: 4
    }
  }), /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    color: colors.onBackground03
  }, STRINGS.LABELS.REPLY_FROM_SENDER_TO_RECEIVER(childMessage, parentMessage, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId)))), /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    justifyContent: variant === 'outgoing' ? 'flex-end' : 'flex-start',
    style: styles.messageContainer
  }, /*#__PURE__*/React.createElement(PressBox, {
    onPress: () => onPress === null || onPress === void 0 ? void 0 : onPress(parentMessage)
  }, parentMessageComponent)));
};
const styles = createStyleSheet({
  messageContainer: {
    opacity: 0.5,
    marginTop: 4,
    marginBottom: -6
  },
  bubbleContainer: {
    maxWidth: 220,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 6
  },
  image: {
    width: 156,
    height: 104,
    borderRadius: 16,
    overflow: 'hidden'
  },
  fileIcon: {
    width: 16,
    height: 16,
    borderRadius: 10,
    marginRight: 4,
    marginTop: 2
  },
  senderLabel: {
    flexDirection: 'row'
  }
});
export default GroupChannelMessageParentMessage;
//# sourceMappingURL=GroupChannelMessageParentMessage.js.map