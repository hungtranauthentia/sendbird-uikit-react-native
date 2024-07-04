import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { NOOP } from '@sendbird/uikit-utils';
import { createOpenChannelSettingsModule } from '../domain/openChannelSettings';
const createOpenChannelSettingsFragment = initModule => {
  const OpenChannelSettingsModule = createOpenChannelSettingsModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel,
      onPressMenuModeration,
      onPressMenuParticipants,
      onPressMenuDeleteChannel,
      onNavigateToOpenChannel,
      menuItemsCreator
    } = _ref;
    const {
      colors
    } = useUIKitTheme();
    const {
      left,
      right
    } = useSafeAreaInsets();
    return /*#__PURE__*/React.createElement(OpenChannelSettingsModule.Provider, {
      channel: channel,
      onNavigateToOpenChannel: onNavigateToOpenChannel
    }, /*#__PURE__*/React.createElement(OpenChannelSettingsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/React.createElement(OpenChannelSettingsModule.Info, null), /*#__PURE__*/React.createElement(OpenChannelSettingsModule.Menu, {
      menuItemsCreator: menuItemsCreator,
      onPressMenuModeration: onPressMenuModeration,
      onPressMenuParticipants: onPressMenuParticipants,
      onPressMenuDeleteChannel: onPressMenuDeleteChannel
    })));
  };
};
const styles = createStyleSheet({
  viewContainer: {
    paddingHorizontal: 16
  }
});
export default createOpenChannelSettingsFragment;
//# sourceMappingURL=createOpenChannelSettingsFragment.js.map