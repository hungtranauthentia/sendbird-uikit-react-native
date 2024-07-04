"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _InternalLocalCacheStorage = _interopRequireDefault(require("./InternalLocalCacheStorage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class MemoryStorage {
  constructor() {
    _defineProperty(this, "_data", {});
  }
  async getAllKeys() {
    return Object.keys(this._data);
  }
  async getItem(key) {
    return this._data[key];
  }
  async removeItem(key) {
    delete this._data[key];
  }
  async setItem(key, value) {
    this._data[key] = value;
  }
}
class EmojiManager {
  constructor() {
    let internalStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _InternalLocalCacheStorage.default(new MemoryStorage());
    this.internalStorage = internalStorage;
    _defineProperty(this, "emojiStorage", {
      container: null,
      get: async () => {
        if (!this.emojiStorage.container) {
          const strItem = await this.internalStorage.getItem(EmojiManager.key);
          if (strItem) this.emojiStorage.container = Object.freeze(JSON.parse(strItem));
        }
        return this.emojiStorage.container;
      },
      set: async container => {
        this.emojiStorage.container = Object.freeze(container);
        await this.internalStorage.setItem(EmojiManager.key, JSON.stringify(container));
      }
    });
    _defineProperty(this, "_emojiCategoryMap", {});
    _defineProperty(this, "_allEmojiMap", {});
    _defineProperty(this, "_allEmoji", []);
    _defineProperty(this, "init", async emojiContainer => {
      if (emojiContainer) await this.emojiStorage.set(emojiContainer);
      const container = await this.emojiStorage.get();
      if (container) {
        for (const category of container.emojiCategories) {
          this._emojiCategoryMap[category.id] = category;
          for (const emoji of category.emojis) {
            this._allEmojiMap[emoji.key] = emoji;
          }
        }
        this._allEmoji = Object.values(this._allEmojiMap);
      }
    });
  }
  get emojiCategoryMap() {
    return this._emojiCategoryMap;
  }
  get allEmojiMap() {
    return this._allEmojiMap;
  }
  get allEmoji() {
    return this._allEmoji;
  }
  get emojiHash() {
    var _this$emojiStorage$co;
    return (_this$emojiStorage$co = this.emojiStorage.container) === null || _this$emojiStorage$co === void 0 ? void 0 : _this$emojiStorage$co.emojiHash;
  }
}
_defineProperty(EmojiManager, "key", 'sendbird-uikit@emoji-manager');
var _default = EmojiManager;
exports.default = _default;
//# sourceMappingURL=EmojiManager.js.map