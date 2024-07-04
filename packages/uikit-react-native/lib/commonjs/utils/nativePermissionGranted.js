"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = nativePermissionGranted;
exports.default = _default;
//# sourceMappingURL=nativePermissionGranted.js.map