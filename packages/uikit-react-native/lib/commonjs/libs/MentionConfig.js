"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class MentionConfig {
  constructor(_config) {
    this._config = _config;
  }
  get mentionLimit() {
    return this._config.mentionLimit;
  }
  get suggestionLimit() {
    return this._config.suggestionLimit;
  }
  get delimiter() {
    return this._config.delimiter;
  }
  get debounceMills() {
    return this._config.debounceMills;
  }
  get trigger() {
    return this._config.trigger;
  }
}
_defineProperty(MentionConfig, "DEFAULT", {
  MENTION_LIMIT: 10,
  SUGGESTION_LIMIT: 15,
  DEBOUNCE_MILLS: 300,
  DELIMITER: ' ',
  TRIGGER: '@'
});
var _default = MentionConfig;
exports.default = _default;
//# sourceMappingURL=MentionConfig.js.map