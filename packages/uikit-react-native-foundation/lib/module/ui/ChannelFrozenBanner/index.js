import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const ChannelFrozenBanner = _ref => {
  let {
    text = 'Channel is frozen',
    backgroundColor,
    textColor,
    style
  } = _ref;
  const {
    palette
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    pointerEvents: 'none',
    style: [styles.container, {
      backgroundColor: backgroundColor ?? palette.information
    }, style]
  }, /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: textColor ?? palette.onBackgroundLight01
  }, text));
};
const styles = createStyleSheet({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 4
  }
});
export default ChannelFrozenBanner;
//# sourceMappingURL=index.js.map