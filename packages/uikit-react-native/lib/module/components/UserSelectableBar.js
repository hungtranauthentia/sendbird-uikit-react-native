import React from 'react';
import { View } from 'react-native';
import { Avatar, Icon, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { conditionChaining } from '@sendbird/uikit-utils';
const UserSelectableBar = _ref => {
  let {
    uri,
    name,
    selected,
    disabled
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const iconColor = conditionChaining([disabled, selected], [colors.onBackground04, colors.primary, colors.onBackground03]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: 36,
    uri: uri,
    containerStyle: styles.avatar
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.infoContainer, {
      borderBottomColor: colors.onBackground04
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    subtitle2: true,
    numberOfLines: 1,
    style: styles.name,
    color: colors.onBackground01
  }, name), /*#__PURE__*/React.createElement(Icon, {
    color: iconColor,
    size: 24,
    icon: selected ? 'checkbox-on' : 'checkbox-off'
  })));
};
const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    paddingHorizontal: 16
  },
  avatar: {
    marginRight: 16
  },
  infoContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  name: {
    flex: 1,
    marginRight: 8
  }
});
export default UserSelectableBar;
//# sourceMappingURL=UserSelectableBar.js.map