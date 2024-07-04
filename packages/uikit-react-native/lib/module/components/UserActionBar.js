import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { conditionChaining } from '@sendbird/uikit-utils';
const UserActionBar = _ref => {
  let {
    muted,
    uri,
    name,
    disabled,
    label,
    onPressActionMenu,
    onPressAvatar
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const iconColor = conditionChaining([disabled], [colors.onBackground04, colors.onBackground01]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPressAvatar,
    style: styles.avatar
  }, /*#__PURE__*/React.createElement(Avatar, {
    muted: muted,
    size: 36,
    uri: uri
  })), /*#__PURE__*/React.createElement(View, {
    style: [styles.infoContainer, {
      borderBottomColor: colors.onBackground04
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    subtitle2: true,
    numberOfLines: 1,
    style: styles.name,
    color: colors.onBackground01
  }, name), Boolean(label) && /*#__PURE__*/React.createElement(Text, {
    body2: true,
    color: colors.onBackground02,
    style: styles.label
  }, label), Boolean(onPressActionMenu) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPressActionMenu,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon, {
    color: iconColor,
    size: 24,
    icon: 'more',
    containerStyle: styles.iconContainer
  }))));
};
const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56
  },
  avatar: {
    marginLeft: 16,
    marginRight: 16
  },
  label: {
    marginRight: 4
  },
  infoContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 12,
    borderBottomWidth: 1
  },
  iconContainer: {
    padding: 4
  },
  name: {
    flex: 1,
    marginRight: 8
  }
});
export default UserActionBar;
//# sourceMappingURL=UserActionBar.js.map