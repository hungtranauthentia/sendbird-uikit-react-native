"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelMessagesWithCollection = void 0;
var _react = require("react");
var _chat = require("@sendbird/chat");
var _groupChannel = require("@sendbird/chat/groupChannel");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useChannelHandler = require("../../handler/useChannelHandler");
var _useChannelMessagesReducer = require("../useChannelMessagesReducer");
const MESSAGE_LIMIT = {
  DEFAULT: 50,
  SEARCH: 20
};
const createMessageCollection = (channel, limit, options) => {
  if (options !== null && options !== void 0 && options.collectionCreator) return options === null || options === void 0 ? void 0 : options.collectionCreator({
    startingPoint: options === null || options === void 0 ? void 0 : options.startingPoint
  });
  const filter = new _groupChannel.MessageFilter();
  if (options.replyType) filter.replyType = options.replyType;
  return channel.createMessageCollection({
    filter,
    limit,
    startingPoint: options === null || options === void 0 ? void 0 : options.startingPoint
  });
};
function isNotEmpty(arr) {
  if (!arr) return false;
  return arr.length !== 0;
}
function shouldUseSearchLimit(startingPoint) {
  return startingPoint < Date.now();
}
const useGroupChannelMessagesWithCollection = (sdk, channel, userId, options) => {
  const initialStartingPoint = (options === null || options === void 0 ? void 0 : options.startingPoint) ?? Number.MAX_SAFE_INTEGER;
  const initialLimit = shouldUseSearchLimit(initialStartingPoint) ? MESSAGE_LIMIT.SEARCH : MESSAGE_LIMIT.DEFAULT;
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const collectionRef = (0, _react.useRef)();
  const collectionInitializedRef = (0, _react.useRef)(false);
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useGroupChannelMessagesWithCollection');
  const {
    loading,
    refreshing,
    messages,
    newMessages,
    updateMessages,
    updateNewMessages,
    deleteNewMessages,
    deleteMessages,
    updateLoading,
    updateRefreshing
  } = (0, _useChannelMessagesReducer.useChannelMessagesReducer)(options === null || options === void 0 ? void 0 : options.sortComparator);
  const channelMarkAsRead = async source => {
    try {
      switch (source) {
        case _chat.CollectionEventSource.EVENT_MESSAGE_RECEIVED:
        case _chat.CollectionEventSource.EVENT_MESSAGE_SENT_SUCCESS:
        case _chat.CollectionEventSource.SYNC_MESSAGE_FILL:
        case undefined:
          await (0, _uikitUtils.confirmAndMarkAsRead)([channel]);
          break;
      }
    } catch (e) {
      _uikitUtils.Logger.warn('[useGroupChannelMessagesWithCollection/channelMarkAsRead]', e);
    }
  };
  const updateNewMessagesReceived = (source, messages) => {
    const incomingMessages = messages.filter(it => {
      var _sdk$currentUser;
      return !(0, _uikitUtils.isMyMessage)(it, (_sdk$currentUser = sdk.currentUser) === null || _sdk$currentUser === void 0 ? void 0 : _sdk$currentUser.userId);
    });
    if (incomingMessages.length > 0) {
      switch (source) {
        case _chat.CollectionEventSource.EVENT_MESSAGE_RECEIVED:
        case _chat.CollectionEventSource.SYNC_MESSAGE_FILL:
          {
            var _options$shouldCountN, _sdk$currentUser2, _options$onMessagesRe;
            if (options !== null && options !== void 0 && (_options$shouldCountN = options.shouldCountNewMessages) !== null && _options$shouldCountN !== void 0 && _options$shouldCountN.call(options)) updateNewMessages(incomingMessages, false, (_sdk$currentUser2 = sdk.currentUser) === null || _sdk$currentUser2 === void 0 ? void 0 : _sdk$currentUser2.userId);
            options === null || options === void 0 ? void 0 : (_options$onMessagesRe = options.onMessagesReceived) === null || _options$onMessagesRe === void 0 ? void 0 : _options$onMessagesRe.call(options, incomingMessages);
            break;
          }
      }
    }
  };
  const updateUnsentMessages = () => {
    var _sdk$currentUser3, _sdk$currentUser4;
    const {
      pendingMessages,
      failedMessages
    } = collectionRef.current ?? {};
    if (isNotEmpty(pendingMessages)) updateMessages(pendingMessages, false, (_sdk$currentUser3 = sdk.currentUser) === null || _sdk$currentUser3 === void 0 ? void 0 : _sdk$currentUser3.userId);
    if (isNotEmpty(failedMessages)) updateMessages(failedMessages, false, (_sdk$currentUser4 = sdk.currentUser) === null || _sdk$currentUser4 === void 0 ? void 0 : _sdk$currentUser4.userId);
  };
  const init = (0, _uikitUtils.useFreshCallback)(async (startingPoint, limit, callback) => {
    var _collectionRef$curren, _sdk$currentUser5, _collectionRef$curren2;
    if (collectionRef.current) (_collectionRef$curren = collectionRef.current) === null || _collectionRef$curren === void 0 ? void 0 : _collectionRef$curren.dispose();
    channelMarkAsRead();
    updateNewMessages([], true, (_sdk$currentUser5 = sdk.currentUser) === null || _sdk$currentUser5 === void 0 ? void 0 : _sdk$currentUser5.userId);
    collectionInitializedRef.current = false;
    collectionRef.current = createMessageCollection(channel, limit, {
      ...options,
      startingPoint
    });
    (_collectionRef$curren2 = collectionRef.current) === null || _collectionRef$curren2 === void 0 ? void 0 : _collectionRef$curren2.setMessageCollectionHandler({
      onMessagesAdded: (ctx, __, messages) => {
        var _sdk$currentUser6;
        channelMarkAsRead(ctx.source);
        updateNewMessagesReceived(ctx.source, messages);
        updateMessages(messages, false, (_sdk$currentUser6 = sdk.currentUser) === null || _sdk$currentUser6 === void 0 ? void 0 : _sdk$currentUser6.userId);
      },
      onMessagesUpdated: (ctx, __, messages) => {
        var _sdk$currentUser7;
        channelMarkAsRead(ctx.source);
        updateNewMessagesReceived(ctx.source, messages); // NOTE: admin message is not added via onMessagesAdded handler, not checked yet is this a bug.

        updateMessages(messages, false, (_sdk$currentUser7 = sdk.currentUser) === null || _sdk$currentUser7 === void 0 ? void 0 : _sdk$currentUser7.userId);
        if (ctx.source === _chat.CollectionEventSource.EVENT_MESSAGE_UPDATED) {
          var _options$onMessagesUp;
          options === null || options === void 0 ? void 0 : (_options$onMessagesUp = options.onMessagesUpdated) === null || _options$onMessagesUp === void 0 ? void 0 : _options$onMessagesUp.call(options, messages);
        }
      },
      onMessagesDeleted: (_, __, ___, messages) => {
        const msgIds = messages.map(it => it.messageId);
        const reqIds = messages.filter(_uikitUtils.isSendableMessage).map(it => it.reqId);
        deleteMessages(msgIds, reqIds);
        deleteNewMessages(msgIds, reqIds);
      },
      onChannelDeleted: () => {
        var _options$onChannelDel;
        options === null || options === void 0 ? void 0 : (_options$onChannelDel = options.onChannelDeleted) === null || _options$onChannelDel === void 0 ? void 0 : _options$onChannelDel.call(options);
      },
      onChannelUpdated: (_, eventChannel) => {
        if (eventChannel.isGroupChannel() && !(0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) {
          forceUpdate();
        }
      },
      onHugeGapDetected: () => {
        init(Number.MAX_SAFE_INTEGER, MESSAGE_LIMIT.DEFAULT);
      }
    });
    collectionRef.current.initialize(_groupChannel.MessageCollectionInitPolicy.CACHE_AND_REPLACE_BY_API).onCacheResult((err, messages) => {
      if (err) sdk.isCacheEnabled && _uikitUtils.Logger.error('[useGroupChannelMessagesWithCollection/onCacheResult]', err);else if (messages) {
        var _sdk$currentUser8;
        _uikitUtils.Logger.debug('[useGroupChannelMessagesWithCollection/onCacheResult]', 'message length:', messages.length);
        updateMessages(messages, true, (_sdk$currentUser8 = sdk.currentUser) === null || _sdk$currentUser8 === void 0 ? void 0 : _sdk$currentUser8.userId);
        updateUnsentMessages();
      }
      callback === null || callback === void 0 ? void 0 : callback();
    }).onApiResult((err, messages) => {
      if (err) _uikitUtils.Logger.warn('[useGroupChannelMessagesWithCollection/onApiResult]', err);else if (messages) {
        var _sdk$currentUser9, _options$onMessagesRe2;
        _uikitUtils.Logger.debug('[useGroupChannelMessagesWithCollection/onApiResult]', 'message length:', messages.length);
        updateMessages(messages, true, (_sdk$currentUser9 = sdk.currentUser) === null || _sdk$currentUser9 === void 0 ? void 0 : _sdk$currentUser9.userId);
        if (!(options !== null && options !== void 0 && options.startingPoint)) options === null || options === void 0 ? void 0 : (_options$onMessagesRe2 = options.onMessagesReceived) === null || _options$onMessagesRe2 === void 0 ? void 0 : _options$onMessagesRe2.call(options, messages);
        if (sdk.isCacheEnabled) updateUnsentMessages();
      }
      collectionInitializedRef.current = true;
      callback === null || callback === void 0 ? void 0 : callback();
    });
  });
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
    onUserBanned(channel, bannedUser) {
      if (channel.isGroupChannel() && !(0, _uikitUtils.isDifferentChannel)(channel, channel)) {
        var _sdk$currentUser10;
        if (bannedUser.userId === ((_sdk$currentUser10 = sdk.currentUser) === null || _sdk$currentUser10 === void 0 ? void 0 : _sdk$currentUser10.userId)) {
          var _options$onChannelDel2;
          options === null || options === void 0 ? void 0 : (_options$onChannelDel2 = options.onChannelDeleted) === null || _options$onChannelDel2 === void 0 ? void 0 : _options$onChannelDel2.call(options);
        } else {
          forceUpdate();
        }
      }
    }
  });
  (0, _react.useEffect)(() => {
    // NOTE: Cache read is heavy task, and it prevents smooth ui transition
    setTimeout(async () => {
      updateLoading(true);
      init(initialStartingPoint, initialLimit, () => updateLoading(false));
    }, 0);
  }, [channel.url, userId, options === null || options === void 0 ? void 0 : options.replyType]);
  (0, _react.useEffect)(() => {
    return () => {
      var _collectionRef$curren3;
      if (collectionRef.current) (_collectionRef$curren3 = collectionRef.current) === null || _collectionRef$curren3 === void 0 ? void 0 : _collectionRef$curren3.dispose();
    };
  }, []);
  const refresh = (0, _uikitUtils.useFreshCallback)(async () => {
    updateRefreshing(true);
    init(Number.MAX_SAFE_INTEGER, MESSAGE_LIMIT.DEFAULT, () => updateRefreshing(false));
  });
  const prev = (0, _uikitUtils.useFreshCallback)(async () => {
    var _collectionRef$curren4;
    if (collectionRef.current && (_collectionRef$curren4 = collectionRef.current) !== null && _collectionRef$curren4 !== void 0 && _collectionRef$curren4.hasPrevious) {
      try {
        var _collectionRef$curren5, _sdk$currentUser11;
        const list = await ((_collectionRef$curren5 = collectionRef.current) === null || _collectionRef$curren5 === void 0 ? void 0 : _collectionRef$curren5.loadPrevious());
        updateMessages(list, false, (_sdk$currentUser11 = sdk.currentUser) === null || _sdk$currentUser11 === void 0 ? void 0 : _sdk$currentUser11.userId);
      } catch {}
    }
  });
  const hasPrev = (0, _uikitUtils.useFreshCallback)(() => {
    if (collectionInitializedRef.current && collectionRef.current) {
      return collectionRef.current.hasPrevious;
    } else {
      return false;
    }
  });
  const next = (0, _uikitUtils.useFreshCallback)(async () => {
    var _collectionRef$curren6;
    if (collectionRef.current && (_collectionRef$curren6 = collectionRef.current) !== null && _collectionRef$curren6 !== void 0 && _collectionRef$curren6.hasNext) {
      try {
        var _collectionRef$curren7, _sdk$currentUser12;
        const fetchedList = await ((_collectionRef$curren7 = collectionRef.current) === null || _collectionRef$curren7 === void 0 ? void 0 : _collectionRef$curren7.loadNext());
        updateMessages(fetchedList, false, (_sdk$currentUser12 = sdk.currentUser) === null || _sdk$currentUser12 === void 0 ? void 0 : _sdk$currentUser12.userId);
      } catch {}
    }
  });
  const hasNext = (0, _uikitUtils.useFreshCallback)(() => {
    if (collectionInitializedRef.current && collectionRef.current) {
      return collectionRef.current.hasNext;
    } else {
      return false;
    }
  });
  const sendUserMessage = (0, _uikitUtils.useFreshCallback)((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isUserMessage()) {
          var _sdk$currentUser13;
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
          updateMessages([pendingMessage], false, (_sdk$currentUser13 = sdk.currentUser) === null || _sdk$currentUser13 === void 0 ? void 0 : _sdk$currentUser13.userId);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isUserMessage()) {
          var _sdk$currentUser14;
          updateMessages([sentMessage], false, (_sdk$currentUser14 = sdk.currentUser) === null || _sdk$currentUser14 === void 0 ? void 0 : _sdk$currentUser14.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, failedMessage) => {
        if (failedMessage) {
          var _sdk$currentUser15;
          updateMessages([failedMessage], false, (_sdk$currentUser15 = sdk.currentUser) === null || _sdk$currentUser15 === void 0 ? void 0 : _sdk$currentUser15.userId);
        }
        reject(err);
      });
    });
  });
  const sendFileMessage = (0, _uikitUtils.useFreshCallback)((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendFileMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isFileMessage()) {
          var _sdk$currentUser16;
          updateMessages([pendingMessage], false, (_sdk$currentUser16 = sdk.currentUser) === null || _sdk$currentUser16 === void 0 ? void 0 : _sdk$currentUser16.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isFileMessage()) {
          var _sdk$currentUser17;
          updateMessages([sentMessage], false, (_sdk$currentUser17 = sdk.currentUser) === null || _sdk$currentUser17 === void 0 ? void 0 : _sdk$currentUser17.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, failedMessage) => {
        if (failedMessage) {
          var _sdk$currentUser18;
          updateMessages([failedMessage], false, (_sdk$currentUser18 = sdk.currentUser) === null || _sdk$currentUser18 === void 0 ? void 0 : _sdk$currentUser18.userId);
        }
        reject(err);
      });
    });
  });
  const updateUserMessage = (0, _uikitUtils.useFreshCallback)(async (messageId, params) => {
    var _sdk$currentUser19;
    const updatedMessage = await channel.updateUserMessage(messageId, params);
    updateMessages([updatedMessage], false, (_sdk$currentUser19 = sdk.currentUser) === null || _sdk$currentUser19 === void 0 ? void 0 : _sdk$currentUser19.userId);
    return updatedMessage;
  });
  const updateFileMessage = (0, _uikitUtils.useFreshCallback)(async (messageId, params) => {
    var _sdk$currentUser20;
    const updatedMessage = await channel.updateFileMessage(messageId, params);
    updateMessages([updatedMessage], false, (_sdk$currentUser20 = sdk.currentUser) === null || _sdk$currentUser20 === void 0 ? void 0 : _sdk$currentUser20.userId);
    return updatedMessage;
  });
  const resendMessage = (0, _uikitUtils.useFreshCallback)(async failedMessage => {
    var _sdk$currentUser21;
    const resentMessage = await (() => {
      if (failedMessage.isUserMessage()) return channel.resendUserMessage(failedMessage);
      if (failedMessage.isFileMessage()) return channel.resendFileMessage(failedMessage);
      return null;
    })();
    if (resentMessage) updateMessages([resentMessage], false, (_sdk$currentUser21 = sdk.currentUser) === null || _sdk$currentUser21 === void 0 ? void 0 : _sdk$currentUser21.userId);
  });
  const deleteMessage = (0, _uikitUtils.useFreshCallback)(async message => {
    if (message.sendingStatus === 'succeeded') {
      if (message.isUserMessage()) await channel.deleteMessage(message);
      if (message.isFileMessage()) await channel.deleteMessage(message);
    } else {
      try {
        var _collectionRef$curren8;
        await ((_collectionRef$curren8 = collectionRef.current) === null || _collectionRef$curren8 === void 0 ? void 0 : _collectionRef$curren8.removeFailedMessage(message.reqId));
      } finally {
        deleteMessages([message.messageId], [message.reqId]);
      }
    }
  });
  const resetNewMessages = (0, _uikitUtils.useFreshCallback)(() => {
    var _sdk$currentUser22;
    updateNewMessages([], true, (_sdk$currentUser22 = sdk.currentUser) === null || _sdk$currentUser22 === void 0 ? void 0 : _sdk$currentUser22.userId);
  });
  const resetWithStartingPoint = (0, _uikitUtils.useFreshCallback)((startingPoint, callback) => {
    var _sdk$currentUser23;
    const limit = shouldUseSearchLimit(startingPoint) ? MESSAGE_LIMIT.SEARCH : MESSAGE_LIMIT.DEFAULT;
    updateLoading(true);
    updateMessages([], true, (_sdk$currentUser23 = sdk.currentUser) === null || _sdk$currentUser23 === void 0 ? void 0 : _sdk$currentUser23.userId);
    init(startingPoint, limit, () => {
      updateLoading(false);
      callback === null || callback === void 0 ? void 0 : callback();
    });
  });
  return {
    loading,
    refreshing,
    refresh,
    messages,
    next,
    hasNext,
    prev,
    hasPrev,
    newMessages,
    resetNewMessages,
    sendUserMessage,
    sendFileMessage,
    updateUserMessage,
    updateFileMessage,
    resendMessage,
    deleteMessage,
    resetWithStartingPoint
  };
};
exports.useGroupChannelMessagesWithCollection = useGroupChannelMessagesWithCollection;
//# sourceMappingURL=useGroupChannelMessagesWithCollection.js.map