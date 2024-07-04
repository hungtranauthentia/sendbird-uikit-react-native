"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("./useContext");
const usePushTokenRegistration = () => {
  const {
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const {
    notificationService
  } = (0, _useContext.usePlatformService)();
  const refreshListener = (0, _react.useRef)();
  const [registerToken, unregisterToken, getToken] = (0, _uikitUtils.useIIFE)(() => {
    return [_reactNative.Platform.select({
      ios: token => sdk.registerAPNSPushTokenForCurrentUser(token),
      default: token => sdk.registerFCMPushTokenForCurrentUser(token)
    }), _reactNative.Platform.select({
      ios: token => sdk.unregisterAPNSPushTokenForCurrentUser(token),
      default: token => sdk.unregisterFCMPushTokenForCurrentUser(token)
    }), _reactNative.Platform.select({
      ios: notificationService.getAPNSToken,
      default: notificationService.getFCMToken
    })];
  });
  const registerPushTokenForCurrentUser = (0, _uikitUtils.useFreshCallback)(async () => {
    // Check and request push permission
    const hasPermission = await notificationService.hasPushPermission();
    if (!hasPermission) {
      const pushPermission = await notificationService.requestPushPermission();
      if (!pushPermission) {
        _uikitUtils.Logger.warn('[usePushTokenRegistration]', 'Not granted push permission');
        return;
      }
    }

    // Register device token
    const token = await getToken();
    if (token) {
      _uikitUtils.Logger.log('[usePushTokenRegistration]', 'registered token:', token);
      registerToken(token);
    }

    // Remove listener
    refreshListener.current = notificationService.onTokenRefresh(registerToken);
  });
  const unregisterPushTokenForCurrentUser = (0, _uikitUtils.useFreshCallback)(async () => {
    var _refreshListener$curr;
    const token = await getToken();
    if (token) {
      unregisterToken(token);
      _uikitUtils.Logger.log('[usePushTokenRegistration]', 'unregistered token:', token);
    }
    (_refreshListener$curr = refreshListener.current) === null || _refreshListener$curr === void 0 ? void 0 : _refreshListener$curr.call(refreshListener);
  });
  return {
    registerPushTokenForCurrentUser,
    unregisterPushTokenForCurrentUser
  };
};
var _default = usePushTokenRegistration;
exports.default = _default;
//# sourceMappingURL=usePushTokenRegistration.js.map