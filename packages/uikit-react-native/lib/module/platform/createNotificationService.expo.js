const createExpoNotificationService = messagingModule => {
  const authorizedStatus = [messagingModule.IosAuthorizationStatus.AUTHORIZED, messagingModule.IosAuthorizationStatus.PROVISIONAL];
  return {
    async getAPNSToken() {
      const response = await messagingModule.getDevicePushTokenAsync();
      return response.data;
    },
    async getFCMToken() {
      const response = await messagingModule.getDevicePushTokenAsync();
      return response.data;
    },
    async hasPushPermission() {
      var _status$ios;
      const status = await messagingModule.getPermissionsAsync();
      return Boolean(status.granted || ((_status$ios = status.ios) === null || _status$ios === void 0 ? void 0 : _status$ios.status) && authorizedStatus.includes(status.ios.status));
    },
    async requestPushPermission() {
      var _status$ios2;
      const status = await messagingModule.requestPermissionsAsync();
      return Boolean(status.granted || ((_status$ios2 = status.ios) === null || _status$ios2 === void 0 ? void 0 : _status$ios2.status) && authorizedStatus.includes(status.ios.status));
    },
    onTokenRefresh(handler) {
      const subscription = messagingModule.addPushTokenListener(_ref => {
        let {
          data
        } = _ref;
        return handler(data);
      });
      return () => messagingModule.removePushTokenSubscription(subscription);
    }
  };
};
export default createExpoNotificationService;
//# sourceMappingURL=createNotificationService.expo.js.map