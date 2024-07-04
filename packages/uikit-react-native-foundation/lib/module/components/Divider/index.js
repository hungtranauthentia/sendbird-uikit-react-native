import React from 'react';
import { View } from 'react-native';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Divider = _ref => {
  let {
    style,
    space
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [style, styles.divider, {
      paddingHorizontal: space
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.inner, {
      backgroundColor: colors.onBackground04
    }]
  }));
};
const styles = createStyleSheet({
  divider: {
    width: '100%',
    height: 1
  },
  inner: {
    width: '100%',
    height: '100%'
  }
});
export default Divider;
//# sourceMappingURL=index.js.map