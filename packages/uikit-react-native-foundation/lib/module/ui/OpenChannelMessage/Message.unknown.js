function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import PressBox from '../../components/PressBox';
import Text from '../../components/Text';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const UnknownMessage = props => {
  const {
    colors
  } = useUIKitTheme();
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/React.createElement(PressBox, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings, _props$strings2;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(MessageContainer, _extends({
      pressed: pressed
    }, rest), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: color.enabled.textMsg
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.unknownTitle) ?? '(Unknown message type)'), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: color.enabled.textMsgPostfix
    }, ((_props$strings2 = props.strings) === null || _props$strings2 === void 0 ? void 0 : _props$strings2.unknownDescription) ?? 'Cannot read this message.'));
  });
};
export default UnknownMessage;
//# sourceMappingURL=Message.unknown.js.map