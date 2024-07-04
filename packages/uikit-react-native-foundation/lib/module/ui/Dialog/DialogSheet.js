import React from 'react';
import { View } from 'react-native';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const DialogSheet = _ref => {
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
const SheetItem = _ref2 => {
  let {
    icon,
    title,
    iconColor,
    titleColor,
    disabled = false
  } = _ref2;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.sheetItemContainer, {
      backgroundColor: colors.ui.dialog.default.none.background
    }]
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    icon: icon,
    color: iconColor ?? (disabled ? colors.ui.dialog.default.none.blurred : colors.ui.dialog.default.none.highlight),
    containerStyle: styles.sheetItemIcon
  }), /*#__PURE__*/React.createElement(Text, {
    subtitle1: true,
    numberOfLines: 1,
    color: titleColor ?? (disabled ? colors.ui.dialog.default.none.blurred : colors.ui.dialog.default.none.text),
    style: styles.sheetItemText
  }, title));
};
const styles = createStyleSheet({
  container: {
    overflow: 'hidden',
    flexDirection: 'column',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  sheetItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48
  },
  sheetItemIcon: {
    marginLeft: 16
  },
  sheetItemText: {
    flex: 1,
    marginHorizontal: 24
  }
});
DialogSheet.Item = SheetItem;
export default DialogSheet;
//# sourceMappingURL=DialogSheet.js.map