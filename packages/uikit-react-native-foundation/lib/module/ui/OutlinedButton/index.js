import React from 'react';
import { Pressable } from 'react-native';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const OutlinedButton = _ref => {
  let {
    children,
    onPress,
    containerStyle
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    style: [styles.outlinedButton, {
      borderColor: colors.onBackground01
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    button: true,
    color: colors.onBackground01,
    numberOfLines: 1,
    style: styles.outlinedButtonText
  }, children));
};
const styles = createStyleSheet({
  outlinedButton: {
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outlinedButtonText: {
    textAlign: 'center',
    width: '100%'
  }
});
export default OutlinedButton;
//# sourceMappingURL=index.js.map