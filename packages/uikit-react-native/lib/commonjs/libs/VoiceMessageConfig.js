"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class VoiceMessageConfig {
  constructor(_config) {
    this._config = _config;
  }
  get recorder() {
    return this._config.recorder;
  }
}
_defineProperty(VoiceMessageConfig, "DEFAULT", {
  RECORDER: {
    MIN_DURATION: 1000,
    MAX_DURATION: 600 * 1000,
    EXTENSION: 'm4a',
    BIT_RATE: 12000,
    SAMPLE_RATE: 11025,
    CHANNELS: 1
  }
});
var _default = VoiceMessageConfig;
exports.default = _default;
//# sourceMappingURL=VoiceMessageConfig.js.map