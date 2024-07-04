import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { NOOP } from '@sendbird/uikit-utils';
import { createOpenChannelModerationModule } from '../domain/openChannelModeration';
const createOpenChannelModerationFragment = initModule => {
  const OpenChannelModerationModule = createOpenChannelModerationModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel,
      onPressMenuMutedParticipants,
      onPressMenuOperators,
      menuItemsCreator,
      onPressMenuBannedUsers
    } = _ref;
    const {
      left,
      right
    } = useSafeAreaInsets();
    const {
      colors
    } = useUIKitTheme();
    return /*#__PURE__*/React.createElement(OpenChannelModerationModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(OpenChannelModerationModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/React.createElement(OpenChannelModerationModule.Menu, {
      onPressMenuOperators: onPressMenuOperators,
      onPressMenuMutedParticipants: onPressMenuMutedParticipants,
      onPressMenuBannedUsers: onPressMenuBannedUsers,
      menuItemsCreator: menuItemsCreator
    })));
  };
};
const styles = createStyleSheet({
  viewContainer: {
    paddingHorizontal: 16
  }
});
export default createOpenChannelModerationFragment;
//# sourceMappingURL=createOpenChannelModerationFragment.js.map