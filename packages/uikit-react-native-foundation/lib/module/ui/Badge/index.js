import React from 'react';
import { Platform, View } from 'react-native';
import { truncatedCount } from '@sendbird/uikit-utils';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Badge = _ref => {
  let {
    count,
    maxCount,
    badgeColor,
    textColor,
    style,
    size = 'default'
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const isSmall = size === 'small';
  return /*#__PURE__*/React.createElement(View, {
    style: [isSmall ? styles.badgeSmall : styles.badgeDefault, {
      backgroundColor: badgeColor ?? colors.ui.badge.default.none.background
    }, count >= 10 && (isSmall ? styles.badgeSmallPadding : styles.badgeDefaultPadding), style]
  }, /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    color: textColor ?? colors.ui.badge.default.none.text
  }, truncatedCount(count, maxCount)));
};
const styles = createStyleSheet({
  badgeDefault: {
    paddingTop: Platform.select({
      ios: 2,
      android: 2
    }),
    minWidth: 20,
    minHeight: 20,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeDefaultPadding: {
    paddingHorizontal: 8
  },
  badgeSmall: {
    paddingTop: Platform.select({
      ios: 3,
      android: 2
    }),
    minWidth: 16,
    minHeight: 16,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeSmallPadding: {
    paddingHorizontal: 4
  }
});
export default Badge;
//# sourceMappingURL=index.js.map