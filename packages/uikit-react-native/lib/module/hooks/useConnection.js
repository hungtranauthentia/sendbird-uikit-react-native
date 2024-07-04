import { useCallback } from 'react';
import { useUIKitConfig } from '@sendbird/uikit-tools';
import { Logger } from '@sendbird/uikit-utils';
import { useSendbirdChat } from './useContext';
import usePushTokenRegistration from './usePushTokenRegistration';
const cacheRestrictCodes = [400300, 400301, 400302, 400310];
function isCacheRestrictedError(error) {
  return cacheRestrictCodes.some(code => error.code === code);
}
async function initEmoji(sdk, emojiManager) {
  var _sdk$appInfo;
  await emojiManager.init();
  if (((_sdk$appInfo = sdk.appInfo) === null || _sdk$appInfo === void 0 ? void 0 : _sdk$appInfo.emojiHash) !== emojiManager.emojiHash) {
    try {
      const container = await sdk.getAllEmoji();
      await emojiManager.init(container);
    } catch {}
  }
}
const useConnection = () => {
  const {
    initDashboardConfigs
  } = useUIKitConfig();
  const {
    sdk,
    emojiManager,
    setCurrentUser,
    sbOptions
  } = useSendbirdChat();
  const {
    registerPushTokenForCurrentUser,
    unregisterPushTokenForCurrentUser
  } = usePushTokenRegistration();
  const connect = useCallback(async (userId, opts) => {
    try {
      Logger.debug('[useConnection]', 'connect start:', userId);
      let user = await sdk.connect(userId, opts === null || opts === void 0 ? void 0 : opts.accessToken);
      if (opts !== null && opts !== void 0 && opts.nickname) {
        Logger.debug('[useConnection]', 'nickname-sync start:', opts.nickname);
        await sdk.updateCurrentUserInfo({
          nickname: opts.nickname
        }).then(updatedUser => user = updatedUser).catch(e => Logger.warn('[useConnection]', 'nickname-sync failure', e));
      } else if (sbOptions.chat.useUserIdForNicknameEnabled) {
        await sdk.updateCurrentUserInfo({
          nickname: userId
        }).then(updatedUser => user = updatedUser);
      }
      if (sbOptions.chat.autoPushTokenRegistrationEnabled) {
        Logger.debug('[useConnection]', 'autoPushTokenRegistration enabled, register for current user');
        await registerPushTokenForCurrentUser().catch(e => {
          Logger.warn('[useConnection]', 'autoPushToken Registration failure', e);
        });
      }
      await Promise.allSettled([initEmoji(sdk, emojiManager), initDashboardConfigs(sdk)]);
      Logger.debug('[useConnection]', 'connected! (online)');
      setCurrentUser(user);
      return user;
    } catch (e) {
      const error = e;
      if (sdk.isCacheEnabled) {
        if (isCacheRestrictedError(error)) {
          Logger.warn('[useConnection]', 'offline connect restricted', error.message, error.code);
          Logger.warn('[useConnection]', 'clear cached-data');
          await sdk.clearCachedData().catch(e => Logger.warn('[useConnection]', 'clear cached-data failure', e));
        } else if (sdk.currentUser) {
          await Promise.allSettled([initEmoji(sdk, emojiManager), initDashboardConfigs(sdk)]);
          Logger.debug('[useConnection]', 'connected! (offline)');
          setCurrentUser(sdk.currentUser);
          return sdk.currentUser;
        }
      }
      Logger.warn('[useConnection]', 'connect failure', error.message, error.code);
      throw error;
    }
  }, [sdk, registerPushTokenForCurrentUser, sbOptions.chat.autoPushTokenRegistrationEnabled]);
  const disconnect = useCallback(async () => {
    Logger.debug('[useConnection]', 'disconnect start');
    if (sbOptions.chat.autoPushTokenRegistrationEnabled) {
      Logger.debug('[useConnection]', 'autoPushTokenRegistration enabled, unregister for current user');
      await unregisterPushTokenForCurrentUser().catch(e => {
        Logger.warn('[useConnection]', 'autoPushToken unregister failure', e);
      });
    }
    await sdk.disconnect().then(() => setCurrentUser(undefined));
    Logger.debug('[useConnection]', 'disconnected!');
  }, [sdk, unregisterPushTokenForCurrentUser, sbOptions.chat.autoPushTokenRegistrationEnabled]);
  return {
    connect,
    disconnect,
    reconnect: () => sdk.reconnect()
  };
};
export default useConnection;
//# sourceMappingURL=useConnection.js.map