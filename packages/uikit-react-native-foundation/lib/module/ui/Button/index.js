import React from 'react';
import { Pressable } from 'react-native';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Button = _ref => {
  let {
    icon,
    variant = 'contained',
    buttonColor,
    contentColor,
    disabled,
    onPress,
    style,
    children
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const getStateColor = (pressed, disabled) => {
    const stateColors = colors.ui.button[variant];
    if (disabled) return stateColors.disabled;
    if (pressed) return stateColors.pressed;
    return stateColors.enabled;
  };
  return /*#__PURE__*/React.createElement(Pressable, {
    disabled: disabled,
    onPress: onPress,
    style: _ref2 => {
      let {
        pressed
      } = _ref2;
      const stateColor = getStateColor(pressed, disabled);
      return [{
        backgroundColor: buttonColor ?? stateColor.background
      }, styles.container, style];
    }
  }, _ref3 => {
    let {
      pressed
    } = _ref3;
    const stateColor = getStateColor(pressed, disabled);
    return /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement(Icon, {
      size: 24,
      icon: icon,
      color: contentColor ?? stateColor.content,
      containerStyle: styles.icon
    }), /*#__PURE__*/React.createElement(Text, {
      button: true,
      color: contentColor ?? stateColor.content,
      style: styles.text
    }, children));
  });
};
const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginVertical: -4,
    marginRight: 8
  },
  text: {}
});
export default Button;
//# sourceMappingURL=index.js.map