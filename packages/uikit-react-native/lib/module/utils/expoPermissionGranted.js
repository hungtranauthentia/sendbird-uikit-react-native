const expoPermissionGranted = (stats, limitedCallback) => {
  return stats.every(res => {
    if ('accessPrivileges' in res) {
      if (res.accessPrivileges === 'limited') limitedCallback === null || limitedCallback === void 0 ? void 0 : limitedCallback();
      return res.granted || res.status === 'granted' || res.accessPrivileges === 'all' || res.accessPrivileges === 'limited';
    }
    if ('ios' in res) {
      var _res$ios;
      // NOT_DETERMINED = 0,
      // DENIED = 1,
      // AUTHORIZED = 2,
      // PROVISIONAL = 3,
      // EPHEMERAL = 4,
      return res.granted || res.status === 'granted' || ((_res$ios = res.ios) === null || _res$ios === void 0 ? void 0 : _res$ios.status) && (res.ios.status === 2 || res.ios.status === 3);
    }
    return res.granted || res.status === 'granted';
  });
};
export default expoPermissionGranted;
//# sourceMappingURL=expoPermissionGranted.js.map