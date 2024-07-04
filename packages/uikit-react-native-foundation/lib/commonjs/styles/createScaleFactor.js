"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_SCALE_FACTOR = void 0;
var _reactNative = require("react-native");
const {
  width,
  height
} = _reactNative.Dimensions.get('window');
const DESIGNED_DEVICE_WIDTH = 360;
const createScaleFactor = function () {
  let deviceWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DESIGNED_DEVICE_WIDTH;
  const ratio = Math.min(width, height) / deviceWidth;
  const rangedRatio = Math.min(Math.max(0.85, ratio), 1.25);
  return dp => _reactNative.PixelRatio.roundToNearestPixel(dp * rangedRatio);
};
let DEFAULT_SCALE_FACTOR = createScaleFactor();
exports.DEFAULT_SCALE_FACTOR = DEFAULT_SCALE_FACTOR;
var _default = Object.assign(createScaleFactor, {
  updateScaleFactor: scaleFactor => {
    exports.DEFAULT_SCALE_FACTOR = DEFAULT_SCALE_FACTOR = scaleFactor;
  }
});
exports.default = _default;
//# sourceMappingURL=createScaleFactor.js.map