import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Icon, MenuBar, Switch, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../../hooks/useContext';
import { GroupChannelModerationContexts } from '../module/moduleContext';
const GroupChannelModerationMenu = _ref => {
  let {
    onPressMenuBannedUsers,
    onPressMenuMutedMembers,
    onPressMenuOperators,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    channel
  } = useContext(GroupChannelModerationContexts.Fragment);
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const [isFrozen, setIsFrozen] = useState(() => channel.isFrozen);
  const toggleFreeze = async () => {
    if (channel.isFrozen) {
      await channel.unfreeze();
    } else {
      await channel.freeze();
    }
    setIsFrozen(channel.isFrozen);
  };
  const menuItems = menuItemsCreator([{
    icon: 'operator',
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_OPERATORS,
    onPress: () => onPressMenuOperators(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'mute',
    visible: !channel.isBroadcast,
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_MUTED_MEMBERS,
    onPress: () => onPressMenuMutedMembers(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'ban',
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_BANNED_USERS,
    onPress: () => onPressMenuBannedUsers(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'freeze',
    visible: !channel.isBroadcast,
    name: STRINGS.GROUP_CHANNEL_MODERATION.MENU_FREEZE_CHANNEL,
    actionItem: /*#__PURE__*/React.createElement(Switch, {
      value: isFrozen,
      onChangeValue: toggleFreeze
    }),
    onPress: toggleFreeze
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
export default GroupChannelModerationMenu;
//# sourceMappingURL=GroupChannelModerationMenu.js.map