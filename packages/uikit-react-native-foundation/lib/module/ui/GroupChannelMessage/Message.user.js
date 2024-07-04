import React from 'react';
import Box from '../../components/Box';
import PressBox from '../../components/PressBox';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageBubbleWithText from './MessageBubbleWithText';
import MessageContainer from './MessageContainer';
const UserMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(PressBox, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(Box, {
      backgroundColor: pressed ? color.pressed.background : color.enabled.background,
      style: styles.container
    }, /*#__PURE__*/React.createElement(MessageBubbleWithText, props), props.children);
  }));
};
const styles = createStyleSheet({
  container: {
    overflow: 'hidden',
    borderRadius: 16
  }
});
export default UserMessage;
//# sourceMappingURL=Message.user.js.map