import React from 'react';
import { View } from 'react-native';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const DialogBox = _ref => {
  let {
    style,
    children
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: colors.ui.dialog.default.none.background
    }, style]
  }, children);
};
const styles = createStyleSheet({
  container: {
    width: 280,
    borderRadius: 4
  }
});
export default DialogBox;
//# sourceMappingURL=DialogBox.js.map