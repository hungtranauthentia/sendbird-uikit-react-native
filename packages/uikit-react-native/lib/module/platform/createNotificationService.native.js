import { Platform } from 'react-native';
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
      if (Platform.OS === 'android') {
        const result = await permissionModule.checkNotifications();
        return result.status === 'granted';
      }
      if (Platform.OS === 'ios') {
        const status = await module.hasPermission();
        return authorizedStatus.includes(status);
      }
      return false;
    },
    async requestPushPermission() {
      if (Platform.OS === 'android') {
        const result = await permissionModule.requestNotifications([]);
        return result.status === 'granted';
      }
      if (Platform.OS === 'ios') {
        const status = await module.requestPermission();
        return authorizedStatus.includes(status);
      }
      return false;
    },
    onTokenRefresh(handler) {
      return module.onTokenRefresh(token => {
        if (Platform.OS === 'android') handler(token);
      });
    }
  };
};
export default createNativeNotificationService;
//# sourceMappingURL=createNotificationService.native.js.map