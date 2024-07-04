import React from 'react';
import { Pressable, View } from 'react-native';
import { conditionChaining } from '@sendbird/uikit-utils';
import Divider from '../../components/Divider';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const MenuBar = _ref => {
  let {
    variant = 'default',
    disabled,
    visible = true,
    onPress,
    name,
    icon,
    iconColor,
    iconBackgroundColor,
    actionLabel,
    actionItem = null
  } = _ref;
  const {
    palette,
    colors
  } = useUIKitTheme();
  if (!visible) return null;
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Pressable, {
    disabled: disabled,
    onPress: onPress,
    style: styles.container
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    icon: icon,
    size: variant === 'contained' ? 16 : 24,
    color: conditionChaining([variant === 'contained', iconColor], [palette.background50, iconColor, colors.primary]),
    containerStyle: [styles.icon, variant === 'contained' && styles.containedIcon, variant === 'contained' && {
      backgroundColor: iconBackgroundColor ?? palette.background400
    }]
  }), /*#__PURE__*/React.createElement(Text, {
    subtitle2: true,
    numberOfLines: 1,
    style: styles.name
  }, name), Boolean(actionLabel) && /*#__PURE__*/React.createElement(Text, {
    subtitle2: true,
    numberOfLines: 1,
    color: colors.onBackground02,
    style: styles.actionLabel
  }, actionLabel), actionItem), /*#__PURE__*/React.createElement(Divider, null));
};
const styles = createStyleSheet({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    flex: 1,
    marginRight: 8
  },
  icon: {
    marginRight: 16
  },
  containedIcon: {
    borderRadius: 24,
    padding: 4
  },
  actionLabel: {
    marginRight: 4
  }
});
export default MenuBar;
//# sourceMappingURL=index.js.map