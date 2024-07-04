function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Logger } from '@sendbird/uikit-utils';
class ImageCompressionConfig {
  constructor(_config) {
    this._config = _config;
    if (_config.compressionRate > 1) Logger.warn('Compression rate must be in the range of 0.0 - 1.0');
  }
  get compressionRate() {
    return Math.min(Math.max(0, this._config.compressionRate), 1);
  }
  get width() {
    return this._config.width;
  }
  get height() {
    return this._config.height;
  }
}
_defineProperty(ImageCompressionConfig, "DEFAULT", {
  COMPRESSION_RATE: 0.7
});
export default ImageCompressionConfig;
//# sourceMappingURL=ImageCompressionConfig.js.map