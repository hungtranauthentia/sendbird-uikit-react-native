import React from 'react';
import { getThumbnailUriFromFileMessage } from '@sendbird/uikit-utils';
import PressBox from '../../components/PressBox';
import { VideoThumbnail } from '../../components/VideoThumbnail';
import createStyleSheet from '../../styles/createStyleSheet';
import MessageContainer from './MessageContainer';
const VideoFileMessage = props => {
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const uri = getThumbnailUriFromFileMessage(props.message);
  return /*#__PURE__*/React.createElement(MessageContainer, rest, /*#__PURE__*/React.createElement(PressBox, {
    style: styles.container,
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/React.createElement(VideoThumbnail, {
    style: styles.container,
    source: uri,
    fetchThumbnailFromVideoSource: props.fetchThumbnailFromVideoSource
  })));
};
const styles = createStyleSheet({
  container: {
    maxWidth: 296,
    height: 196,
    borderRadius: 8,
    overflow: 'hidden'
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  playIcon: {
    padding: 10,
    borderRadius: 50
  }
});
export default VideoFileMessage;
//# sourceMappingURL=Message.file.video.js.map