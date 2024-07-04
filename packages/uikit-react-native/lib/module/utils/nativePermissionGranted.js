const nativePermissionGranted = (stats, limitedCallback) => {
  return Object.values(stats).every(result => {
    if (result === 'granted') return true;
    if (result === 'limited') {
      limitedCallback === null || limitedCallback === void 0 ? void 0 : limitedCallback();
      return true;
    }
    return false;
  });
};
export default nativePermissionGranted;
//# sourceMappingURL=nativePermissionGranted.js.map