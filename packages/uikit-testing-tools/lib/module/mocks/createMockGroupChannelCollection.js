function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck
import { ChannelType } from '@sendbird/chat';
import { GroupChannelFilter, GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import { createTestContext } from '../utils/createTestContext';
import { createMockChannel } from './createMockChannel';
export const createMockGroupChannelCollection = params => {
  return new MockGroupChannelCollection(params);
};
const tc = createTestContext();
class MockGroupChannelCollection {
  constructor(params) {
    this.params = params;
    _defineProperty(this, "__handlerId", void 0);
    _defineProperty(this, "channels", []);
    _defineProperty(this, "filter", new GroupChannelFilter());
    _defineProperty(this, "order", GroupChannelListOrder.LATEST_LAST_MESSAGE);
    _defineProperty(this, "dispose", jest.fn(() => {
      if (this.__handlerId && this.params.sdk) {
        delete this.params.sdk.__context.groupChannelCollectionHandlers[this.__handlerId];
      }
    }));
    _defineProperty(this, "hasMore", true);
    _defineProperty(this, "loadMore", jest.fn(async () => {
      const channels = Array(this.params.limit ?? 20).fill(null).map(() => createMockChannel({
        sdk: this.params.sdk,
        channelType: ChannelType.GROUP
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