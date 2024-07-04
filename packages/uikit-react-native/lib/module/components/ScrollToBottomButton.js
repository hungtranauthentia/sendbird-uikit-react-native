import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Icon, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
const ScrollToBottomButton = _ref => {
  let {
    visible,
    onPress
  } = _ref;
  const {
    palette,
    select
  } = useUIKitTheme();
  if (!visible) return null;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    activeOpacity: 0.8,
    disabled: !visible,
    style: [styles.container, {
      backgroundColor: select({
        dark: palette.background400,
        light: palette.background50
      })
    }]
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'chevron-down',
    size: 22
  }));
};
const styles = createStyleSheet({
  container: {
    padding: 8,
    borderRadius: 24,
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3
      }
    })
  }
});
export default /*#__PURE__*/React.memo(ScrollToBottomButton);
//# sourceMappingURL=ScrollToBottomButton.js.map