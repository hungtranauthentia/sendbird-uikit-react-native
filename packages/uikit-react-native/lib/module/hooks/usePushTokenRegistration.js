import { useRef } from 'react';
import { Platform } from 'react-native';
import { Logger, useFreshCallback, useIIFE } from '@sendbird/uikit-utils';
import { usePlatformService, useSendbirdChat } from './useContext';
const usePushTokenRegistration = () => {
  const {
    sdk
  } = useSendbirdChat();
  const {
    notificationService
  } = usePlatformService();
  const refreshListener = useRef();
  const [registerToken, unregisterToken, getToken] = useIIFE(() => {
    return [Platform.select({
      ios: token => sdk.registerAPNSPushTokenForCurrentUser(token),
      default: token => sdk.registerFCMPushTokenForCurrentUser(token)
    }), Platform.select({
      ios: token => sdk.unregisterAPNSPushTokenForCurrentUser(token),
      default: token => sdk.unregisterFCMPushTokenForCurrentUser(token)
    }), Platform.select({
      ios: notificationService.getAPNSToken,
      default: notificationService.getFCMToken
    })];
  });
  const registerPushTokenForCurrentUser = useFreshCallback(async () => {
    // Check and request push permission
    const hasPermission = await notificationService.hasPushPermission();
    if (!hasPermission) {
      const pushPermission = await notificationService.requestPushPermission();
      if (!pushPermission) {
        Logger.warn('[usePushTokenRegistration]', 'Not granted push permission');
        return;
      }
    }

    // Register device token
    const token = await getToken();
    if (token) {
      Logger.log('[usePushTokenRegistration]', 'registered token:', token);
      registerToken(token);
    }

    // Remove listener
    refreshListener.current = notificationService.onTokenRefresh(registerToken);
  });
  const unregisterPushTokenForCurrentUser = useFreshCallback(async () => {
    var _refreshListener$curr;
    const token = await getToken();
    if (token) {
      unregisterToken(token);
      Logger.log('[usePushTokenRegistration]', 'unregistered token:', token);
    }
    (_refreshListener$curr = refreshListener.current) === null || _refreshListener$curr === void 0 ? void 0 : _refreshListener$curr.call(refreshListener);
  });
  return {
    registerPushTokenForCurrentUser,
    unregisterPushTokenForCurrentUser
  };
};
export default usePushTokenRegistration;
//# sourceMappingURL=usePushTokenRegistration.js.map