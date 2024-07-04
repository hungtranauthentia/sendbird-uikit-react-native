import React from 'react';
import { getFileExtension, getFileType, truncate } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import Icon from '../../components/Icon';
import PressBox from '../../components/PressBox';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const FileMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    colors
  } = useUIKitTheme();
  const fileType = getFileType(props.message.type || getFileExtension(props.message.name));
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(PressBox, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(Box, {
      backgroundColor: pressed ? color.pressed.background : color.enabled.background,
      style: styles.container
    }, /*#__PURE__*/React.createElement(Box, {
      style: styles.bubble
    }, /*#__PURE__*/React.createElement(Icon.File, {
      fileType: fileType,
      size: 24,
      containerStyle: {
        backgroundColor: colors.background,
        padding: 2,
        borderRadius: 8,
        marginRight: 8
      }
    }), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      ellipsizeMode: 'middle',
      numberOfLines: 1,
      color: pressed ? color.pressed.textMsg : color.enabled.textMsg,
      style: styles.name
    }, truncate(((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.fileName) || props.message.name, {
      mode: 'mid',
      maxLen: 20
    }))), props.children);
  }));
};
const styles = createStyleSheet({
  container: {
    overflow: 'hidden',
    borderRadius: 16
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  name: {
    flexShrink: 1
  }
});
export default FileMessage;
//# sourceMappingURL=Message.file.js.map