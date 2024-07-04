"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockSendbirdChat = void 0;
var _chat = require("@sendbird/chat");
var _uikitUtils = require("@sendbird/uikit-utils");
var _createTestContext = require("../utils/createTestContext");
var _createMockChannel = require("./createMockChannel");
var _createMockGroupChannelCollection = require("./createMockGroupChannelCollection");
var _createMockQuery = require("./createMockQuery");
var _createMockUser = require("./createMockUser");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-nocheck
const tc = (0, _createTestContext.createTestContext)();
const defaultParams = {
  testType: 'success',
  userId: 'user_id_' + tc.getHash(),
  appInfo: {
    emojiHash: 'hash',
    uploadSizeLimit: 999999,
    useReaction: true,
    applicationAttributes: Object.values(_uikitUtils.ApplicationAttributes),
    premiumFeatureList: Object.values(_uikitUtils.PremiumFeatures),
    enabledChannelMemberShipHistory: false
  },
  localCacheEnabled: false
};
const createMockSendbirdChat = function () {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultParams;
  return new MockSDK(params).asMockSendbirdChatSDK();
};

// @ts-ignore
exports.createMockSendbirdChat = createMockSendbirdChat;
class MockSDK {
  __emit() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    let [name, type, ...args] = _ref;
    switch (name) {
      case 'channel':
        {
          if (type.startsWith('open_')) {
            const eventName = type.replace('open_', '');
            Object.values(this.__context.openChannelHandlers).forEach(handler => {
              var _handler$eventName;
              // @ts-ignore
              (_handler$eventName = handler[eventName]) === null || _handler$eventName === void 0 ? void 0 : _handler$eventName.call(handler, ...args);
            });
          }
          if (type.startsWith('group_')) {
            const eventName = type.replace('group_', '');
            Object.values(this.__context.groupChannelHandlers).forEach(handler => {
              var _handler$eventName2;
              // @ts-ignore
              (_handler$eventName2 = handler[eventName]) === null || _handler$eventName2 === void 0 ? void 0 : _handler$eventName2.call(handler, ...args);
            });
          }
          break;
        }
      case 'connection':
        {
          const eventName = type;
          Object.values(this.__context.connectionHandlers).forEach(handler => {
            var _handler$eventName3;
            // @ts-ignore
            (_handler$eventName3 = handler[eventName]) === null || _handler$eventName3 === void 0 ? void 0 : _handler$eventName3.call(handler, ...args);
          });
          break;
        }
      case 'userEvent':
        {
          const eventName = type;
          Object.values(this.__context.userEventHandlers).forEach(handler => {
            var _handler$eventName4;
            // @ts-ignore
            (_handler$eventName4 = handler[eventName]) === null || _handler$eventName4 === void 0 ? void 0 : _handler$eventName4.call(handler, ...args);
          });
          break;
        }
    }
  }
  __throwIfFailureTest() {
    if (this.__params.testType === 'failure') throw new Error('Failure test');
  }
  get appInfo() {
    return this.__context.appInfo;
  }
  get isCacheEnabled() {
    return this.__context.localCacheEnabled;
  }
  constructor() {
    let _params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultParams;
    _defineProperty(this, "__params", defaultParams);
    _defineProperty(this, "__context", {
      groupChannels: [],
      openChannels: [],
      groupChannelCollections: [],
      groupChannelHandlers: {},
      openChannelHandlers: {},
      connectionHandlers: {},
      userEventHandlers: {},
      groupChannelCollectionHandlers: {},
      groupChannelMessageCollectionHandlers: {},
      pushTriggerOption: _chat.PushTriggerOption.DEFAULT,
      appInfo: this.__params.appInfo,
      localCacheEnabled: this.__params.localCacheEnabled
    });
    _defineProperty(this, "currentUser", (0, _createMockUser.createMockUser)(this.__params));
    _defineProperty(this, "addConnectionHandler", jest.fn((id, handler) => {
      this.__context.connectionHandlers[id] = handler;
    }));
    _defineProperty(this, "removeConnectionHandler", jest.fn(id => {
      delete this.__context.connectionHandlers[id];
    }));
    _defineProperty(this, "addUserEventHandler", jest.fn((id, handler) => {
      this.__context.userEventHandlers[id] = handler;
    }));
    _defineProperty(this, "removeUserEventHandler", jest.fn(id => {
      delete this.__context.userEventHandlers[id];
    }));
    _defineProperty(this, "setPushTriggerOption", jest.fn(async option => {
      this.__throwIfFailureTest();
      this.__context.pushTriggerOption = option;
      return this.__context.pushTriggerOption;
    }));
    _defineProperty(this, "getPushTriggerOption", jest.fn(async () => {
      this.__throwIfFailureTest();
      return this.__context.pushTriggerOption;
    }));
    _defineProperty(this, "connect", jest.fn(async () => {
      this.__throwIfFailureTest();
      this.__emit('connection', 'onReconnectStarted');
      this.__emit('connection', 'onReconnectSucceeded');
      return this.currentUser;
    }));
    _defineProperty(this, "createApplicationUserListQuery", jest.fn(params => {
      return (0, _createMockQuery.createMockQuery)({
        type: 'user',
        limit: params === null || params === void 0 ? void 0 : params.limit,
        dataLength: 200,
        sdk: this.asMockSendbirdChatSDK()
      });
    }));
    _defineProperty(this, "groupChannel", {
      createMyGroupChannelListQuery: jest.fn(params => {
        return (0, _createMockQuery.createMockQuery)({
          type: 'groupChannel',
          limit: params === null || params === void 0 ? void 0 : params.limit,
          dataLength: 200,
          sdk: this.asMockSendbirdChatSDK()
        });
      }),
      createGroupChannelCollection: jest.fn(params => {
        this.__throwIfFailureTest();
        const gcc = (0, _createMockGroupChannelCollection.createMockGroupChannelCollection)({
          ...params,
          sdk: this.asMockSendbirdChatSDK()
        });
        this.__context.groupChannelCollections.push(gcc);
        return gcc;
      }),
      getChannel: jest.fn(async url => {
        this.__throwIfFailureTest();
        const channelInContext = this.__context.groupChannels.find(it => it.url === url);
        if (channelInContext) {
          return channelInContext;
        } else {
          const channel = (0, _createMockChannel.createMockChannel)({
            channelType: _chat.ChannelType.GROUP,
            url,
            sdk: this.asMockSendbirdChatSDK()
          }).asGroupChannel();
          this.__context.groupChannels.push(channel);
          return channel;
        }
      }),
      addGroupChannelHandler: jest.fn((id, handler) => {
        this.__context.groupChannelHandlers[id] = handler;
      }),
      removeGroupChannelHandler: jest.fn(id => {
        delete this.__context.groupChannelHandlers[id];
      }),
      getTotalUnreadMessageCount: jest.fn(() => {
        return 10;
      }),
      getTotalUnreadChannelCount: jest.fn(() => {
        return 10;
      })
    });
    _defineProperty(this, "openChannel", {
      getChannel: jest.fn(async url => {
        this.__throwIfFailureTest();
        const channelInContext = this.__context.openChannels.find(it => it.url === url);
        if (channelInContext) {
          return channelInContext;
        } else {
          const channel = (0, _createMockChannel.createMockChannel)({
            channelType: _chat.ChannelType.OPEN,
            url,
            sdk: this.asMockSendbirdChatSDK()
          }).asOpenChannel();
          this.__context.openChannels.push(channel);
          return channel;
        }
      }),
      addOpenChannelHandler: jest.fn((id, handler) => {
        this.__context.openChannelHandlers[id] = handler;
      }),
      removeOpenChannelHandler: jest.fn(id => {
        delete this.__context.openChannelHandlers[id];
      }),
      createOpenChannelListQuery: jest.fn(params => {
        return (0, _createMockQuery.createMockQuery)({
          type: 'openChannel',
          limit: params === null || params === void 0 ? void 0 : params.limit,
          dataLength: 200,
          sdk: this.asMockSendbirdChatSDK()
        });
      })
    });
    this.__params = {
      ...defaultParams,
      ..._params
    };
    this.__context.appInfo = {
      ...this.__context.appInfo,
      ...this.__params.appInfo
    };
    this.__context.localCacheEnabled = this.__params.localCacheEnabled;
  }
  asMockSendbirdChatSDK() {
    return this;
  }
}
//# sourceMappingURL=createMockSendbirdSDK.js.map