import React from 'react';
import Box from '../../components/Box';
import PressBox from '../../components/PressBox';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const UnknownMessage = props => {
  const {
    variant = 'incoming'
  } = props;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant];
  const titleColor = variant === 'incoming' ? colors.onBackground01 : colors.onBackgroundReverse01;
  const descColor = variant === 'incoming' ? colors.onBackground02 : colors.onBackgroundReverse02;
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(PressBox, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    var _props$strings, _props$strings2;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(Box, {
      style: styles.bubble,
      backgroundColor: pressed ? color.pressed.background : color.enabled.background
    }, /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: titleColor
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.unknownTitle) ?? '(Unknown message type)'), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: descColor
    }, ((_props$strings2 = props.strings) === null || _props$strings2 === void 0 ? void 0 : _props$strings2.unknownDescription) ?? 'Cannot read this message.'));
  }));
};
const styles = createStyleSheet({
  bubble: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  }
});
export default UnknownMessage;
//# sourceMappingURL=Message.unknown.js.map