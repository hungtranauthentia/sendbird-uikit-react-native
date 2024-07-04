"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockGroupChannelCollection = void 0;
var _chat = require("@sendbird/chat");
var _groupChannel = require("@sendbird/chat/groupChannel");
var _createTestContext = require("../utils/createTestContext");
var _createMockChannel = require("./createMockChannel");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-nocheck
const createMockGroupChannelCollection = params => {
  return new MockGroupChannelCollection(params);
};
exports.createMockGroupChannelCollection = createMockGroupChannelCollection;
const tc = (0, _createTestContext.createTestContext)();
class MockGroupChannelCollection {
  constructor(params) {
    this.params = params;
    _defineProperty(this, "__handlerId", void 0);
    _defineProperty(this, "channels", []);
    _defineProperty(this, "filter", new _groupChannel.GroupChannelFilter());
    _defineProperty(this, "order", _groupChannel.GroupChannelListOrder.LATEST_LAST_MESSAGE);
    _defineProperty(this, "dispose", jest.fn(() => {
      if (this.__handlerId && this.params.sdk) {
        delete this.params.sdk.__context.groupChannelCollectionHandlers[this.__handlerId];
      }
    }));
    _defineProperty(this, "hasMore", true);
    _defineProperty(this, "loadMore", jest.fn(async () => {
      const channels = Array(this.params.limit ?? 20).fill(null).map(() => (0, _createMockChannel.createMockChannel)({
        sdk: this.params.sdk,
        channelType: _chat.ChannelType.GROUP
      }).asGroupChannel());
      this.channels = [...this.channels, ...channels];
      return channels;
    }));
    _defineProperty(this, "setGroupChannelCollectionHandler", jest.fn(handler => {
      if (this.params.sdk) {
        this.__handlerId = String(tc.getRandom());
        this.params.sdk.__context.groupChannelCollectionHandlers[this.__handlerId] = handler;
      }
    }));
    Object.assign(this, params);
  }
}
//# sourceMappingURL=createMockGroupChannelCollection.js.map