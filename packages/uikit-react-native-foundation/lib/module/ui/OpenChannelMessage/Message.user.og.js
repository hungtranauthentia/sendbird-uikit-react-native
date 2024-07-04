function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { urlRegexRough } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import PressBox from '../../components/PressBox';
import RegexText from '../../components/RegexText';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import MessageContainer from './MessageContainer';
const OpenGraphUserMessage = props => {
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
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(PressBox, {
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
        regex: urlRegexRough,
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
  }), props.message.ogMetaData && /*#__PURE__*/React.createElement(MessageContainer, _extends({}, rest, {
    grouped: true
  }), /*#__PURE__*/React.createElement(PressBox, {
    style: styles.ogContainer,
    onPress: () => {
      var _props$message$ogMeta;
      return ((_props$message$ogMeta = props.message.ogMetaData) === null || _props$message$ogMeta === void 0 ? void 0 : _props$message$ogMeta.url) && (onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(props.message.ogMetaData.url));
    },
    onLongPress: onLongPress
  }, _ref3 => {
    let {
      pressed
    } = _ref3;
    return props.message.ogMetaData && /*#__PURE__*/React.createElement(Box, {
      padding: 8,
      borderRadius: 8,
      style: styles.ogContainer,
      backgroundColor: pressed ? color.pressed.bubbleBackground : color.enabled.bubbleBackground
    }, /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      caption2: true,
      color: colors.onBackground02,
      style: styles.ogUrl
    }, props.message.ogMetaData.url), /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 2,
      body2: true,
      color: colors.primary,
      style: styles.ogTitle
    }, props.message.ogMetaData.title), Boolean(props.message.ogMetaData.description) && /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 2,
      caption2: true,
      color: colors.onBackground01
    }, props.message.ogMetaData.description), !!props.message.ogMetaData.defaultImage && /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
      style: styles.ogImage,
      source: {
        uri: props.message.ogMetaData.defaultImage.url
      }
    }));
  })));
};
const styles = createStyleSheet({
  ogContainer: {
    maxWidth: 296
  },
  ogUrl: {
    marginBottom: 4
  },
  ogTitle: {
    marginBottom: 8
  },
  ogImage: {
    width: '100%',
    height: 156,
    marginTop: 12
  }
});
export default OpenGraphUserMessage;
//# sourceMappingURL=Message.user.og.js.map