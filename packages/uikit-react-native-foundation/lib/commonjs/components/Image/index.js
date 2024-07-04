"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
function getImageModule() {
  const hasFastImage = Boolean(_reactNative.NativeModules.FastImageView);
  if (hasFastImage) {
    try {
      return require('./Image.fastimage').default;
    } catch (e) {
      return require('./Image.reactnative').default;
    }
  } else {
    return require('./Image.reactnative').default;
  }
}
const Image = getImageModule();
var _default = Image;
exports.default = _default;
//# sourceMappingURL=index.js.map