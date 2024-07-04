function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { urlRegexStrict } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import RegexText from '../../components/RegexText';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const MessageBubbleWithText = _ref => {
  let {
    backgroundColor,
    message,
    onPressURL,
    onLongPress,
    strings,
    variant = 'incoming',
    regexTextPatterns = [],
    renderRegexTextChildren = msg => msg.message
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/React.createElement(Box, {
    backgroundColor: backgroundColor,
    style: styles.bubble
  }, /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: color.enabled.textMsg,
    suppressHighlighting: true
  }, /*#__PURE__*/React.createElement(RegexText, {
    body3: true,
    color: color.enabled.textMsg,
    patterns: [...regexTextPatterns, {
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
          style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, styles.urlText]
        }), match);
      }
    }]
  }, renderRegexTextChildren(message)), Boolean(message.updatedAt) && /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: color.enabled.textEdited
  }, (strings === null || strings === void 0 ? void 0 : strings.edited) ?? ' (edited)')));
};
const styles = createStyleSheet({
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  urlText: {
    textDecorationLine: 'underline'
  }
});
export default MessageBubbleWithText;
//# sourceMappingURL=MessageBubbleWithText.js.map