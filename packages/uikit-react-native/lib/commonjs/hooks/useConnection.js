"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _uikitTools = require("@sendbird/uikit-tools");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("./useContext");
var _usePushTokenRegistration = _interopRequireDefault(require("./usePushTokenRegistration"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  } = (0, _uikitTools.useUIKitConfig)();
  const {
    sdk,
    emojiManager,
    setCurrentUser,
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    registerPushTokenForCurrentUser,
    unregisterPushTokenForCurrentUser
  } = (0, _usePushTokenRegistration.default)();
  const connect = (0, _react.useCallback)(async (userId, opts) => {
    try {
      _uikitUtils.Logger.debug('[useConnection]', 'connect start:', userId);
      let user = await sdk.connect(userId, opts === null || opts === void 0 ? void 0 : opts.accessToken);
      if (opts !== null && opts !== void 0 && opts.nickname) {
        _uikitUtils.Logger.debug('[useConnection]', 'nickname-sync start:', opts.nickname);
        await sdk.updateCurrentUserInfo({
          nickname: opts.nickname
        }).then(updatedUser => user = updatedUser).catch(e => _uikitUtils.Logger.warn('[useConnection]', 'nickname-sync failure', e));
      } else if (sbOptions.chat.useUserIdForNicknameEnabled) {
        await sdk.updateCurrentUserInfo({
          nickname: userId
        }).then(updatedUser => user = updatedUser);
      }
      if (sbOptions.chat.autoPushTokenRegistrationEnabled) {
        _uikitUtils.Logger.debug('[useConnection]', 'autoPushTokenRegistration enabled, register for current user');
        await registerPushTokenForCurrentUser().catch(e => {
          _uikitUtils.Logger.warn('[useConnection]', 'autoPushToken Registration failure', e);
        });
      }
      await Promise.allSettled([initEmoji(sdk, emojiManager), initDashboardConfigs(sdk)]);
      _uikitUtils.Logger.debug('[useConnection]', 'connected! (online)');
      setCurrentUser(user);
      return user;
    } catch (e) {
      const error = e;
      if (sdk.isCacheEnabled) {
        if (isCacheRestrictedError(error)) {
          _uikitUtils.Logger.warn('[useConnection]', 'offline connect restricted', error.message, error.code);
          _uikitUtils.Logger.warn('[useConnection]', 'clear cached-data');
          await sdk.clearCachedData().catch(e => _uikitUtils.Logger.warn('[useConnection]', 'clear cached-data failure', e));
        } else if (sdk.currentUser) {
          await Promise.allSettled([initEmoji(sdk, emojiManager), initDashboardConfigs(sdk)]);
          _uikitUtils.Logger.debug('[useConnection]', 'connected! (offline)');
          setCurrentUser(sdk.currentUser);
          return sdk.currentUser;
        }
      }
      _uikitUtils.Logger.warn('[useConnection]', 'connect failure', error.message, error.code);
      throw error;
    }
  }, [sdk, registerPushTokenForCurrentUser, sbOptions.chat.autoPushTokenRegistrationEnabled]);
  const disconnect = (0, _react.useCallback)(async () => {
    _uikitUtils.Logger.debug('[useConnection]', 'disconnect start');
    if (sbOptions.chat.autoPushTokenRegistrationEnabled) {
      _uikitUtils.Logger.debug('[useConnection]', 'autoPushTokenRegistration enabled, unregister for current user');
      await unregisterPushTokenForCurrentUser().catch(e => {
        _uikitUtils.Logger.warn('[useConnection]', 'autoPushToken unregister failure', e);
      });
    }
    await sdk.disconnect().then(() => setCurrentUser(undefined));
    _uikitUtils.Logger.debug('[useConnection]', 'disconnected!');
  }, [sdk, unregisterPushTokenForCurrentUser, sbOptions.chat.autoPushTokenRegistrationEnabled]);
  return {
    connect,
    disconnect,
    reconnect: () => sdk.reconnect()
  };
};
var _default = useConnection;
exports.default = _default;
//# sourceMappingURL=useConnection.js.map