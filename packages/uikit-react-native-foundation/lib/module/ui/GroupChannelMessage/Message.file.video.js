import React from 'react';
import { getThumbnailUriFromFileMessage } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import PressBox from '../../components/PressBox';
import { VideoThumbnail } from '../../components/VideoThumbnail';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const VideoFileMessage = props => {
  const {
    onPress,
    onLongPress,
    variant = 'incoming'
  } = props;
  const {
    colors
  } = useUIKitTheme();
  const uri = getThumbnailUriFromFileMessage(props.message);
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(Box, {
    style: styles.container,
    backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
  }, /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/React.createElement(VideoThumbnail, {
    style: styles.image,
    source: uri,
    fetchThumbnailFromVideoSource: props.fetchThumbnailFromVideoSource
  })), props.children));
};
const styles = createStyleSheet({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    maxWidth: 240,
    width: 240,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden'
  },
  playIcon: {
    padding: 10,
    borderRadius: 50
  }
});
export default VideoFileMessage;
//# sourceMappingURL=Message.file.video.js.map