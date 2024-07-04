import React from 'react';
import { View } from 'react-native';
import Icon from '../../components/Icon';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const AvatarIcon = _ref => {
  let {
    size = 56,
    icon,
    containerStyle,
    backgroundColor
  } = _ref;
  const {
    colors,
    palette
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: backgroundColor ?? palette.background300
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: icon,
    size: size / 2,
    color: colors.onBackgroundReverse01
  }));
};
const styles = createStyleSheet({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default AvatarIcon;
//# sourceMappingURL=AvatarIcon.js.map