function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import Box from '../../components/Box';
import PressBox from '../../components/PressBox';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageBubbleWithText from './MessageBubbleWithText';
import MessageContainer from './MessageContainer';
import MessageOpenGraph from './MessageOpenGraph';
const OpenGraphUserMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    palette,
    select,
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant];
  const containerBackgroundColor = select({
    dark: palette.background400,
    light: palette.background100
  });
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(PressBox, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(Box, {
      backgroundColor: containerBackgroundColor,
      style: styles.container
    }, /*#__PURE__*/React.createElement(MessageBubbleWithText, _extends({
      backgroundColor: pressed ? color.pressed.background : color.enabled.background
    }, props)), props.message.ogMetaData && /*#__PURE__*/React.createElement(MessageOpenGraph, {
      variant: variant,
      ogMetaData: props.message.ogMetaData,
      onLongPress: props.onLongPress,
      onPressURL: props.onPressURL
    }), props.children);
  }));
};
const styles = createStyleSheet({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  }
});
export default OpenGraphUserMessage;
//# sourceMappingURL=Message.user.og.js.map