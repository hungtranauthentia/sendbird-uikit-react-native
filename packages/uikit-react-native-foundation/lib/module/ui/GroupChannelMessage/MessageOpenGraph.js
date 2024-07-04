import React from 'react';
import Box from '../../components/Box';
import ImageWithPlaceholder from '../../components/ImageWithPlaceholder';
import PressBox from '../../components/PressBox';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const MessageOpenGraph = _ref => {
  let {
    onPressURL,
    onLongPress,
    ogMetaData,
    variant
  } = _ref;
  const {
    palette,
    select,
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.85,
    onPress: () => typeof (ogMetaData === null || ogMetaData === void 0 ? void 0 : ogMetaData.url) === 'string' && (onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(ogMetaData.url)),
    onLongPress: onLongPress
  }, _ref2 => {
    let {
      pressed
    } = _ref2;
    return /*#__PURE__*/React.createElement(Box, {
      backgroundColor: pressed ? color.pressed.background : color.enabled.background
    }, !!ogMetaData.defaultImage && /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
      style: styles.ogImage,
      source: {
        uri: ogMetaData.defaultImage.url
      }
    }), /*#__PURE__*/React.createElement(Box, {
      style: styles.ogContainer,
      backgroundColor: select({
        dark: palette.background400,
        light: palette.background100
      })
    }, /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 3,
      body2: true,
      color: colors.onBackground01,
      style: styles.ogTitle
    }, ogMetaData.title), !!ogMetaData.description && /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      caption2: true,
      color: colors.onBackground01,
      style: styles.ogDesc
    }, ogMetaData.description), /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      caption2: true,
      color: colors.onBackground02
    }, ogMetaData.url)));
  });
};
const styles = createStyleSheet({
  ogContainer: {
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12
  },
  ogImage: {
    maxWidth: 240,
    width: 240,
    height: 136
  },
  ogUrl: {
    marginBottom: 4
  },
  ogTitle: {
    marginBottom: 4
  },
  ogDesc: {
    lineHeight: 14,
    marginBottom: 8
  }
});
export default MessageOpenGraph;
//# sourceMappingURL=MessageOpenGraph.js.map