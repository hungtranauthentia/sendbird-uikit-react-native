import React from 'react';
import { getThumbnailUriFromFileMessage } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import PressBox from '../../components/PressBox';
import createStyleSheet from '../../styles/createStyleSheet';
import MessageContainer from './MessageContainer';
const ImageFileMessage = props => {
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const uri = getThumbnailUriFromFileMessage(props.message);
  return /*#__PURE__*/React.createElement(MessageContainer, rest, /*#__PURE__*/React.createElement(Box, {
    borderRadius: 8,
    overflow: 'hidden',
    style: styles.container
  }, /*#__PURE__*/React.createElement(PressBox, {
    style: styles.container,
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
    source: {
      uri
    },
    width: '100%',
    height: '100%'
  }))));
};
const styles = createStyleSheet({
  container: {
    maxWidth: 296,
    height: 196
  }
});
export default ImageFileMessage;
//# sourceMappingURL=Message.file.image.js.map