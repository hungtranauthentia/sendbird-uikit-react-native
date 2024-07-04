"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const createNativeNotificationService = _ref => {
  let {
    messagingModule,
    permissionModule
  } = _ref;
  const module = messagingModule();
  const authorizedStatus = [messagingModule.AuthorizationStatus.AUTHORIZED, messagingModule.AuthorizationStatus.PROVISIONAL];
  return {
    getAPNSToken() {
      return module.getAPNSToken();
    },
    getFCMToken() {
      return module.getToken();
    },
    async hasPushPermission() {
      if (_reactNative.Platform.OS === 'android') {
        const result = await permissionModule.checkNotifications();
        return result.status === 'granted';
      }
      if (_reactNative.Platform.OS === 'ios') {
        const status = await module.hasPermission();
        return authorizedStatus.includes(status);
      }
      return false;
    },
    async requestPushPermission() {
      if (_reactNative.Platform.OS === 'android') {
        const result = await permissionModule.requestNotifications([]);
        return result.status === 'granted';
      }
      if (_reactNative.Platform.OS === 'ios') {
        const status = await module.requestPermission();
        return authorizedStatus.includes(status);
      }
      return false;
    },
    onTokenRefresh(handler) {
      return module.onTokenRefresh(token => {
        if (_reactNative.Platform.OS === 'android') handler(token);
      });
    }
  };
};
var _default = createNativeNotificationService;
exports.default = _default;
//# sourceMappingURL=createNotificationService.native.js.map