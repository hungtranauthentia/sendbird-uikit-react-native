function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { urlRegexStrict } from '@sendbird/uikit-utils';
import PressBox from '../../components/PressBox';
import RegexText from '../../components/RegexText';
import Text from '../../components/Text';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const UserMessage = props => {
  const {
    colors
  } = useUIKitTheme();
  const {
    onPress,
    onLongPress,
    onPressURL,
    ...rest
  } = props;
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/React.createElement(PressBox, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/React.createElement(MessageContainer, _extends({
      pressed: pressed
    }, rest), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: color.enabled.textMsg
    }, /*#__PURE__*/React.createElement(RegexText, {
      body3: true,
      color: color.enabled.textMsg,
      patterns: [{
        regex: urlRegexStrict,
        replacer(_ref2) {
          let {
            match,
            parentProps,
            keyPrefix,
            index
          } = _ref2;
          return /*#__PURE__*/React.createElement(Text, _extends({}, parentProps, {
            key: `${keyPrefix}-${index}`,
            onPress: () => onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(match),
            onLongPress: onLongPress,
            color: colors.primary,
            style: parentProps === null || parentProps === void 0 ? void 0 : parentProps.style
          }), match);
        }
      }]
    }, props.message.message), Boolean(props.message.updatedAt) && /*#__PURE__*/React.createElement(Text, {
      body3: true,
      color: color.enabled.textMsgPostfix
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.edited) ?? ' (edited)')));
  });
};
export default UserMessage;
//# sourceMappingURL=Message.user.js.map