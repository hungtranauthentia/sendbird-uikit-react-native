import React from 'react';
import { View } from 'react-native';
import { Icon, MenuBar, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../../hooks/useContext';
const OpenChannelModerationMenu = _ref => {
  let {
    onPressMenuBannedUsers,
    onPressMenuMutedParticipants,
    onPressMenuOperators,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const menuItems = menuItemsCreator([{
    icon: 'operator',
    name: STRINGS.OPEN_CHANNEL_MODERATION.MENU_OPERATORS,
    onPress: () => onPressMenuOperators(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'mute',
    name: STRINGS.OPEN_CHANNEL_MODERATION.MENU_MUTED_PARTICIPANTS,
    onPress: () => onPressMenuMutedParticipants(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'ban',
    name: STRINGS.OPEN_CHANNEL_MODERATION.MENU_BANNED_USERS,
    onPress: () => onPressMenuBannedUsers(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }]);
  return /*#__PURE__*/React.createElement(View, null, menuItems.map(menu => {
    return /*#__PURE__*/React.createElement(MenuBar, {
      key: menu.name,
      onPress: menu.onPress,
      name: menu.name,
      disabled: menu.disabled,
      visible: menu.visible,
      icon: menu.icon,
      iconColor: menu.iconColor,
      iconBackgroundColor: menu.iconBackgroundColor,
      actionLabel: menu.actionLabel,
      actionItem: menu.actionItem
    });
  }));
};
export default OpenChannelModerationMenu;
//# sourceMappingURL=OpenChannelModerationMenu.js.map