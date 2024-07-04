"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class InternalLocalCacheStorage {
  constructor(storage) {
    this.storage = storage;
    _defineProperty(this, "clear", _uikitUtils.ASYNC_NOOP);
    _defineProperty(this, "flushGetRequests", _uikitUtils.ASYNC_NOOP);
  }
  getAllKeys() {
    return this.storage.getAllKeys();
  }
  getItem(key) {
    return this.storage.getItem(key);
  }
  removeItem(key) {
    return this.storage.removeItem(key);
  }
  setItem(key, value) {
    return this.storage.setItem(key, value);
  }
  async multiGet(keys) {
    if (this.storage.multiGet) {
      return this.storage.multiGet(keys);
    } else {
      return Promise.all(keys.map(async key => [key, await this.getItem(key)]));
    }
  }
  async multiRemove(keys) {
    if (this.storage.multiRemove) {
      await this.storage.multiRemove(keys);
    } else {
      await Promise.all(keys.map(async key => this.removeItem(key)));
    }
  }
  async multiSet(keyValuePairs) {
    if (this.storage.multiSet) {
      await this.storage.multiSet(keyValuePairs);
    } else {
      await Promise.all(keyValuePairs.map(_ref => {
        let [key, value] = _ref;
        return this.storage.setItem(key, value);
      }));
    }
  }
}
exports.default = InternalLocalCacheStorage;
//# sourceMappingURL=InternalLocalCacheStorage.js.map