import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
const ProviderLayout = _ref => {
  let {
    children
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.view, {
      backgroundColor: colors.background
    }]
  }, children);
};
const styles = createStyleSheet({
  view: {
    flex: 1
  }
});
export default ProviderLayout;
//# sourceMappingURL=ProviderLayout.js.map