import React, { useContext } from 'react';
import { Box, Divider, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getOpenChannelTitle } from '@sendbird/uikit-utils';
import ChannelCover from '../../../components/ChannelCover';
import { useLocalization } from '../../../hooks/useContext';
import { OpenChannelSettingsContexts } from '../module/moduleContext';
const OpenChannelSettingsInfo = _ => {
  const {
    channel
  } = useContext(OpenChannelSettingsContexts.Fragment);
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    paddingVertical: 24,
    alignItems: 'center'
  }, /*#__PURE__*/React.createElement(ChannelCover, {
    channel: channel,
    size: 80,
    containerStyle: styles.avatarContainer
  }), /*#__PURE__*/React.createElement(Text, {
    h1: true,
    numberOfLines: 1
  }, getOpenChannelTitle(channel) || ' ')), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Box, {
    paddingVertical: 16
  }, /*#__PURE__*/React.createElement(Text, {
    body2: true,
    color: colors.onBackground02,
    style: styles.infoUrl
  }, STRINGS.OPEN_CHANNEL_SETTINGS.INFO_URL), /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: colors.onBackground01
  }, channel.url)), /*#__PURE__*/React.createElement(Divider, null));
};
const styles = createStyleSheet({
  avatarContainer: {
    marginBottom: 12
  },
  infoUrl: {
    marginBottom: 4
  }
});
export default OpenChannelSettingsInfo;
//# sourceMappingURL=OpenChannelSettingsInfo.js.map