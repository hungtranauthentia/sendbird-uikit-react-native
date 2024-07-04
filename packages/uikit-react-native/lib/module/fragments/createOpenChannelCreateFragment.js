import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { NOOP, PASS } from '@sendbird/uikit-utils';
import { createOpenChannelCreateModule } from '../domain/openChannelCreate';
import { useSendbirdChat } from '../hooks/useContext';
const createOpenChannelCreateFragment = initModule => {
  const OpenChannelCreateModule = createOpenChannelCreateModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      onBeforeCreateChannel = PASS,
      onCreateChannel
    } = _ref;
    const {
      sdk,
      currentUser
    } = useSendbirdChat();
    const {
      palette
    } = useUIKitTheme();
    const [loading, setLoading] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channelCoverFile, setChannelCoverFile] = useState(undefined);
    const shouldActivateHeaderRight = () => {
      return Boolean(currentUser) && channelName.trim() !== '';
    };
    const onPressHeaderRight = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const params = {
            name: channelName,
            operatorUserIds: [currentUser.userId]
          };
          if (channelCoverFile) params.coverUrlOrImage = channelCoverFile;
          const processedParams = await onBeforeCreateChannel(params);
          const channel = await sdk.openChannel.createChannel(processedParams);
          setLoading(false);
          onCreateChannel(channel);
        } catch {
          setLoading(false);
        }
      }
    };
    return /*#__PURE__*/React.createElement(OpenChannelCreateModule.Provider, null, /*#__PURE__*/React.createElement(OpenChannelCreateModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: onPressHeaderRight,
      shouldActivateHeaderRight: shouldActivateHeaderRight
    }), /*#__PURE__*/React.createElement(OpenChannelCreateModule.ProfileInput, {
      channelName: channelName,
      onChangeChannelName: setChannelName,
      channelCoverFile: channelCoverFile,
      onChangeChannelCoverFile: setChannelCoverFile
    }), loading && /*#__PURE__*/React.createElement(Box, {
      backgroundColor: palette.transparent,
      style: StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center'
    }, /*#__PURE__*/React.createElement(OpenChannelCreateModule.StatusLoading, null)));
  };
};
export default createOpenChannelCreateFragment;
//# sourceMappingURL=createOpenChannelCreateFragment.js.map