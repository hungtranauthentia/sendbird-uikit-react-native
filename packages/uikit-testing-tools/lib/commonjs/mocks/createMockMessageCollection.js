"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockMessageCollection = void 0;
var _groupChannel = require("@sendbird/chat/groupChannel");
var _message = require("@sendbird/chat/message");
var _createTestContext = require("../utils/createTestContext");
var _createMockMessage = require("./createMockMessage");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-nocheck
const createMockMessageCollection = params => {
  return new MockMessageCollection(params);
};
exports.createMockMessageCollection = createMockMessageCollection;
const tc = (0, _createTestContext.createTestContext)();
class MockMessageCollection {
  constructor(params) {
    this.params = params;
    _defineProperty(this, "__handlerId", void 0);
    _defineProperty(this, "__messages", []);
    _defineProperty(this, "__cursor", 0);
    _defineProperty(this, "__fetchedMessage", []);
    _defineProperty(this, "__initialized", false);
    _defineProperty(this, "__apiInitHandler", () => void 0);
    _defineProperty(this, "__cacheInitHandler", () => void 0);
    _defineProperty(this, "setMessageCollectionHandler", jest.fn(handler => {
      if (this.params.sdk && this.channel) {
        this.__handlerId = String(tc.getRandom());
        this.params.sdk.__context.groupChannelMessageCollectionHandlers = {
          ...this.params.sdk.__context.groupChannelMessageCollectionHandlers,
          [this.channel.url]: {
            ...this.params.sdk.__context.groupChannelMessageCollectionHandlers[this.channel.url],
            [this.__handlerId]: handler
          }
        };
      }
    }));
    _defineProperty(this, "initialize", jest.fn(_policy => {
      const initHandler = {
        onCacheResult: jest.fn(handler => {
          this.__cacheInitHandler = handler;
          return initHandler;
        }),
        onApiResult: jest.fn(handler => {
          this.__apiInitHandler = handler;
          return initHandler;
        })
      };
      setTimeout(() => {
        const start = this.__cursor;
        const end = start + (this.params.limit ?? 10);
        this.__fetchedMessage = [...this.__fetchedMessage, ...this.__messages.slice(start, end)];
        this.__cursor = end;
        this.__initialized = true;
        this.__cacheInitHandler(null, this.__fetchedMessage);
      }, 0);
      setTimeout(() => {
        this.__apiInitHandler(null, this.__fetchedMessage);
      }, 1);
      return initHandler;
    }));
    _defineProperty(this, "dispose", jest.fn(() => {
      if (this.__handlerId && this.params.sdk && this.channel) {
        delete this.params.sdk.__context.groupChannelMessageCollectionHandlers[this.channel.url][this.__handlerId];
      }
    }));
    _defineProperty(this, "removeFailedMessage", jest.fn());
    _defineProperty(this, "loadNext", jest.fn(async () => {
      return [];
    }));
    _defineProperty(this, "loadPrevious", jest.fn(async () => {
      if (this.hasPrevious) {
        const start = this.__cursor;
        const end = start + (this.params.limit ?? 10);
        const messages = this.__messages.slice(start, end);
        this.__fetchedMessage = [...this.__fetchedMessage, ...messages];
        this.__cursor = end;
        return messages;
      } else {
        return [];
      }
    }));
    _defineProperty(this, "filter", new _groupChannel.MessageFilter());
    Object.assign(this, params);
    this.__messages = Array(this.params.dataLength ?? (this.params.limit ?? 10) * 5).fill(null).map(() => (0, _createMockMessage.createMockMessage)({
      sdk: this.params.sdk,
      sendingStatus: _message.SendingStatus.SUCCEEDED
    }).asBaseMessage()).reverse();
  }
  get channel() {
    return this.params.groupChannel;
  }
  get hasNext() {
    if (!this.__initialized) return false;
    return false;
  }
  get hasPrevious() {
    if (!this.__initialized) return false;
    return this.__fetchedMessage.length < this.__messages.length;
  }
  get failedMessages() {
    return [];
  }
  get pendingMessages() {
    return [];
  }
  get succeededMessages() {
    return this.__fetchedMessage;
  }
  asMessageCollection() {
    return this;
  }
}
//# sourceMappingURL=createMockMessageCollection.js.map