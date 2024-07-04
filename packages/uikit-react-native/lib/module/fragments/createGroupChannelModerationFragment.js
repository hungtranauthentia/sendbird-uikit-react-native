import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { NOOP } from '@sendbird/uikit-utils';
import { createGroupChannelModerationModule } from '../domain/groupChannelModeration';
const createGroupChannelModerationFragment = initModule => {
  const GroupChannelModerationModule = createGroupChannelModerationModule(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft = NOOP,
      onPressMenuBannedUsers,
      onPressMenuMutedMembers,
      onPressMenuOperators,
      menuItemsCreator
    } = _ref;
    const {
      left,
      right
    } = useSafeAreaInsets();
    const {
      colors
    } = useUIKitTheme();
    return /*#__PURE__*/React.createElement(GroupChannelModerationModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(GroupChannelModerationModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/React.createElement(GroupChannelModerationModule.Menu, {
      onPressMenuBannedUsers: onPressMenuBannedUsers,
      onPressMenuMutedMembers: onPressMenuMutedMembers,
      onPressMenuOperators: onPressMenuOperators,
      menuItemsCreator: menuItemsCreator
    })));
  };
};
const styles = createStyleSheet({
  viewContainer: {
    paddingHorizontal: 16
  }
});
export default createGroupChannelModerationFragment;
//# sourceMappingURL=createGroupChannelModerationFragment.js.map