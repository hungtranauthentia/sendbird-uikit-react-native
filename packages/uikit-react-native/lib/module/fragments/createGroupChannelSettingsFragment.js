import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { NOOP } from '@sendbird/uikit-utils';
import createGroupChannelSettingsModule from '../domain/groupChannelSettings/module/createGroupChannelSettingsModule';
const createGroupChannelSettingsFragment = initModule => {
  const GroupChannelSettingsModule = createGroupChannelSettingsModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel,
      onPressMenuModeration,
      onPressMenuMembers,
      onPressMenuSearchInChannel,
      onPressMenuLeaveChannel,
      onPressMenuNotification,
      menuItemsCreator
    } = _ref;
    const {
      colors
    } = useUIKitTheme();
    const {
      left,
      right
    } = useSafeAreaInsets();
    return /*#__PURE__*/React.createElement(GroupChannelSettingsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(GroupChannelSettingsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/React.createElement(GroupChannelSettingsModule.Info, null), /*#__PURE__*/React.createElement(GroupChannelSettingsModule.Menu, {
      menuItemsCreator: menuItemsCreator,
      onPressMenuModeration: onPressMenuModeration,
      onPressMenuMembers: onPressMenuMembers,
      onPressMenuSearchInChannel: onPressMenuSearchInChannel,
      onPressMenuLeaveChannel: onPressMenuLeaveChannel,
      onPressMenuNotification: onPressMenuNotification
    })));
  };
};
const styles = createStyleSheet({
  viewContainer: {
    paddingHorizontal: 16
  }
});
export default createGroupChannelSettingsFragment;
//# sourceMappingURL=createGroupChannelSettingsFragment.js.map