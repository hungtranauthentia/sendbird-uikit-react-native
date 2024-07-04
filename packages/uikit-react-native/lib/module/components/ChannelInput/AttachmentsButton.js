import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
const AttachmentsButton = _ref => {
  let {
    onPress,
    disabled
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon, {
    color: disabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'add',
    size: 24,
    containerStyle: styles.container
  }));
};
const styles = createStyleSheet({
  container: {
    marginRight: 8,
    padding: 4
  }
});
export default AttachmentsButton;
//# sourceMappingURL=AttachmentsButton.js.map