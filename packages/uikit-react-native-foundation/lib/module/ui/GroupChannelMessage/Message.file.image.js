import React from 'react';
import { getThumbnailUriFromFileMessage } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import PressBox from '../../components/PressBox';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const ImageFileMessage = props => {
  const {
    onPress,
    onLongPress,
    variant = 'incoming'
  } = props;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(Box, {
    style: styles.container,
    backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
  }, /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
    source: {
      uri: getThumbnailUriFromFileMessage(props.message)
    },
    style: styles.image
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
  }
});
export default ImageFileMessage;
//# sourceMappingURL=Message.file.image.js.map