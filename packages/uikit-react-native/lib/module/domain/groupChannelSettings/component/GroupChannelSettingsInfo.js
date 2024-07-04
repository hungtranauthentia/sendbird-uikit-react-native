import React, { useContext } from 'react';
import { View } from 'react-native';
import { Divider, Text, createStyleSheet } from '@sendbird/uikit-react-native-foundation';
import { getGroupChannelTitle } from '@sendbird/uikit-utils';
import ChannelCover from '../../../components/ChannelCover';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
import { GroupChannelSettingsContexts } from '../module/moduleContext';
const GroupChannelSettingsInfo = _ => {
  const {
    channel
  } = useContext(GroupChannelSettingsContexts.Fragment);
  const {
    currentUser
  } = useSendbirdChat();
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: styles.userInfoContainer
  }, /*#__PURE__*/React.createElement(ChannelCover, {
    channel: channel,
    size: 80,
    containerStyle: styles.avatarContainer
  }), /*#__PURE__*/React.createElement(Text, {
    h1: true,
    numberOfLines: 1
  }, getGroupChannelTitle((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) || '', channel, STRINGS.LABELS.USER_NO_NAME, STRINGS.LABELS.CHANNEL_NO_MEMBERS) || ' ')), /*#__PURE__*/React.createElement(Divider, null));
};
const styles = createStyleSheet({
  container: {
    flex: 1
  },
  userInfoContainer: {
    paddingVertical: 24,
    alignItems: 'center'
  },
  avatarContainer: {
    marginBottom: 12
  },
  userIdContainer: {
    paddingVertical: 16
  },
  userIdLabel: {
    marginBottom: 4
  }
});
export default GroupChannelSettingsInfo;
//# sourceMappingURL=GroupChannelSettingsInfo.js.map