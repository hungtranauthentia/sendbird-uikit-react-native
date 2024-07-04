"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const DEFAULT_LANDSCAPE_HEIGHT = 48;
const DEFAULT_HEIGHT = 56;
const getDefaultHeaderHeight = isLandscape => {
  if (isLandscape) return DEFAULT_LANDSCAPE_HEIGHT;
  return DEFAULT_HEIGHT;
};
var _default = getDefaultHeaderHeight;
exports.default = _default;
//# sourceMappingURL=getDefaultHeaderHeight.js.map