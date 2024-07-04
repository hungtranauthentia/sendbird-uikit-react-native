import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, ImageWithPlaceholder, Text, VideoThumbnail, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getFileIconFromMessageType, getMessageType, getThumbnailUriFromFileMessage } from '@sendbird/uikit-utils';
import { useLocalization, usePlatformService } from '../../hooks/useContext';
export const MessageToReplyPreview = _ref => {
  let {
    messageToReply,
    setMessageToReply
  } = _ref;
  const {
    colors,
    select,
    palette
  } = useUIKitTheme();
  const {
    mediaService
  } = usePlatformService();
  const {
    STRINGS
  } = useLocalization();
  const getFileIconAsImage = url => {
    return /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
      source: {
        uri: url
      },
      style: styles.previewImage
    });
  };
  const getFileIconAsVideoThumbnail = url => {
    return /*#__PURE__*/React.createElement(VideoThumbnail, {
      style: styles.previewImage,
      iconSize: 0,
      source: url,
      fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
        url: uri,
        timeMills: 1000
      })
    });
  };
  const getFileIconAsSymbol = icon => {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: icon,
      size: 20,
      color: colors.onBackground02,
      containerStyle: [styles.fileIcon, {
        backgroundColor: select({
          light: palette.background100,
          dark: palette.background500
        })
      }]
    });
  };
  const getFileIcon = messageToReply => {
    if (messageToReply !== null && messageToReply !== void 0 && messageToReply.isFileMessage()) {
      const messageType = getMessageType(messageToReply);
      switch (messageType) {
        case 'file.image':
          return getFileIconAsImage(getThumbnailUriFromFileMessage(messageToReply));
        case 'file.video':
          return getFileIconAsVideoThumbnail(getThumbnailUriFromFileMessage(messageToReply));
        case 'file.voice':
          return null;
        default:
          return getFileIconAsSymbol(getFileIconFromMessageType(messageType));
      }
    }
    return null;
  };
  if (!messageToReply) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.messageToReplyContainer, {
      borderColor: colors.onBackground04
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, getFileIcon(messageToReply), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    style: {
      fontSize: 13,
      fontWeight: '900',
      marginBottom: 4
    }
  }, STRINGS.LABELS.CHANNEL_INPUT_REPLY_PREVIEW_TITLE(messageToReply.sender)), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    style: {
      fontSize: 13,
      color: colors.onBackground03
    }
  }, STRINGS.LABELS.CHANNEL_INPUT_REPLY_PREVIEW_BODY(messageToReply)))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => setMessageToReply === null || setMessageToReply === void 0 ? void 0 : setMessageToReply(undefined)
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'close',
    size: 24,
    color: colors.onBackground01,
    containerStyle: styles.closeIcon
  })));
};
const styles = createStyleSheet({
  previewImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginTop: 2,
    marginRight: 10,
    overflow: 'hidden'
  },
  messageToReplyContainer: {
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: 'center',
    borderTopWidth: 1
  },
  fileIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 2
  },
  closeIcon: {
    marginLeft: 4,
    padding: 4
  }
});
//# sourceMappingURL=MessageToReplyPreview.js.map