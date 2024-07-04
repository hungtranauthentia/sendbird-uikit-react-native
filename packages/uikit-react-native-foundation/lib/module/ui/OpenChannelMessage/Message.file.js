import React from 'react';
import { getFileTypeFromMessage } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import Icon from '../../components/Icon';
import PressBox from '../../components/PressBox';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const FileMessage = props => {
  const {
    colors
  } = useUIKitTheme();
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const type = getFileTypeFromMessage(props.message);
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/React.createElement(MessageContainer, rest, /*#__PURE__*/React.createElement(PressBox, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(Box, {
      padding: 8,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      style: {
        backgroundColor: pressed ? color.pressed.bubbleBackground : color.enabled.bubbleBackground
      }
    }, /*#__PURE__*/React.createElement(Box, {
      padding: 4,
      marginRight: 8,
      borderRadius: 8,
      alignItems: 'flex-start',
      backgroundColor: colors.background
    }, /*#__PURE__*/React.createElement(Icon.File, {
      fileType: type,
      size: 32
    })), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      numberOfLines: 1,
      ellipsizeMode: 'middle',
      color: color.enabled.textMsg,
      style: styles.fileName
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.fileName) || props.message.name));
  }));
};
const styles = createStyleSheet({
  fileName: {
    flexShrink: 1
  }
});
export default FileMessage;
//# sourceMappingURL=Message.file.js.map