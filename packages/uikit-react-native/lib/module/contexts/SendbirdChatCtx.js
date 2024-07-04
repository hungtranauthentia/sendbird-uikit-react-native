import React, { useCallback, useEffect, useState } from 'react';
import { useAppFeatures } from '@sendbird/uikit-chat-hooks';
import { useUIKitConfig } from '@sendbird/uikit-tools';
import { confirmAndMarkAsDelivered, useAppState, useForceUpdate } from '@sendbird/uikit-utils';
export const SendbirdChatContext = /*#__PURE__*/React.createContext(null);
export const SendbirdChatProvider = _ref => {
  let {
    children,
    sdkInstance,
    emojiManager,
    mentionManager,
    imageCompressionConfig,
    voiceMessageConfig,
    enableAutoPushTokenRegistration,
    enableUseUserIdForNickname,
    enableImageCompression
  } = _ref;
  const [currentUser, _setCurrentUser] = useState();
  const forceUpdate = useForceUpdate();
  const appFeatures = useAppFeatures(sdkInstance);
  const {
    configs,
    configsWithAppAttr
  } = useUIKitConfig();
  const setCurrentUser = useCallback(user => {
    // NOTE: Sendbird SDK handle User object is always same object, so force update after setCurrentUser
    _setCurrentUser(user);
    forceUpdate();
  }, []);
  const updateCurrentUserInfo = useCallback(async (nickname, profile) => {
    let user = currentUser;
    if (!user) throw new Error('Current user is not defined, please connect using `useConnection()` hook first');
    const params = {};
    if (!nickname) {
      params.nickname = user.nickname;
    } else {
      params.nickname = nickname;
    }
    if (!profile) {
      params.profileUrl = user.profileUrl;
    } else if (typeof profile === 'string') {
      params.profileUrl = profile;
    } else if (typeof profile === 'object') {
      params.profileImage = profile;
    } else {
      throw new Error(`Cannot update profile, not supported profile type(${typeof profile})`);
    }
    user = await sdkInstance.updateCurrentUserInfo(params);
    setCurrentUser(user);
    return user;
  }, [sdkInstance, currentUser, setCurrentUser]);
  const markAsDeliveredWithChannel = useCallback(channel => {
    if (appFeatures.deliveryReceiptEnabled) confirmAndMarkAsDelivered([channel]);
  }, [sdkInstance, appFeatures.deliveryReceiptEnabled]);
  useAppState('change', status => {
    // 'active' | 'background' | 'inactive' | 'unknown' | 'extension';
    if (status === 'active') sdkInstance.connectionState === 'CLOSED' && sdkInstance.setForegroundState();else if (status === 'background') sdkInstance.connectionState === 'OPEN' && sdkInstance.setBackgroundState();
  });
  useEffect(() => {
    return () => {
      sdkInstance.disconnect().then(() => _setCurrentUser(undefined));
    };
  }, [sdkInstance]);
  const value = {
    sdk: sdkInstance,
    emojiManager,
    mentionManager,
    imageCompressionConfig,
    voiceMessageConfig,
    currentUser,
    setCurrentUser,
    updateCurrentUserInfo,
    markAsDeliveredWithChannel,
    // TODO: Options should be moved to the common area at the higher level to be passed to the context of each product.
    //  For example, common -> chat context, common -> calls context
    sbOptions: {
      appInfo: appFeatures,
      uikit: configs,
      uikitWithAppInfo: configsWithAppAttr(sdkInstance),
      chat: {
        autoPushTokenRegistrationEnabled: enableAutoPushTokenRegistration,
        useUserIdForNicknameEnabled: enableUseUserIdForNickname,
        imageCompressionEnabled: enableImageCompression
      }
    }
  };
  return /*#__PURE__*/React.createElement(SendbirdChatContext.Provider, {
    value: value
  }, children);
};
//# sourceMappingURL=SendbirdChatCtx.js.map