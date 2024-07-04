"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelMessagesWithQuery = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useChannelHandler = require("../../handler/useChannelHandler");
var _useChannelMessagesReducer = require("../useChannelMessagesReducer");
const createMessageQuery = (channel, options) => {
  if (options !== null && options !== void 0 && options.queryCreator) return options.queryCreator();
  const params = {
    limit: 100,
    reverse: true
  };
  if (options !== null && options !== void 0 && options.replyType) params.replyType = options.replyType;
  return channel.createPreviousMessageListQuery(params);
};
const useGroupChannelMessagesWithQuery = (sdk, channel, userId, options) => {
  const queryRef = (0, _react.useRef)();
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useGroupChannelMessagesWithQuery');
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const {
    loading,
    refreshing,
    messages,
    newMessages,
    updateMessages,
    deleteMessages,
    updateNewMessages,
    deleteNewMessages,
    updateLoading,
    updateRefreshing
  } = (0, _useChannelMessagesReducer.useChannelMessagesReducer)(options === null || options === void 0 ? void 0 : options.sortComparator);
  const channelMarkAsRead = async () => {
    try {
      await (0, _uikitUtils.confirmAndMarkAsRead)([channel]);
    } catch (e) {
      _uikitUtils.Logger.warn('[useGroupChannelMessagesWithQuery/channelMarkAsRead]', e);
    }
  };
  const init = (0, _uikitUtils.useFreshCallback)(async uid => {
    if (uid) {
      var _sdk$currentUser, _queryRef$current;
      channelMarkAsRead();
      updateNewMessages([], true, (_sdk$currentUser = sdk.currentUser) === null || _sdk$currentUser === void 0 ? void 0 : _sdk$currentUser.userId);
      queryRef.current = createMessageQuery(channel, options);
      if ((_queryRef$current = queryRef.current) !== null && _queryRef$current !== void 0 && _queryRef$current.hasNext) {
        var _queryRef$current2, _sdk$currentUser2;
        const list = await ((_queryRef$current2 = queryRef.current) === null || _queryRef$current2 === void 0 ? void 0 : _queryRef$current2.load());
        updateMessages(list, true, (_sdk$currentUser2 = sdk.currentUser) === null || _sdk$currentUser2 === void 0 ? void 0 : _sdk$currentUser2.userId);
      }
    }
  });
  const channelUpdater = channel => {
    if (channel.isGroupChannel() && !(0, _uikitUtils.isDifferentChannel)(channel, channel)) {
      forceUpdate();
    }
  };
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
    // Messages
    onMessageReceived(eventChannel, message) {
      var _sdk$currentUser3, _sdk$currentUser4, _options$shouldCountN;
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if ((0, _uikitUtils.isMyMessage)(message, (_sdk$currentUser3 = sdk.currentUser) === null || _sdk$currentUser3 === void 0 ? void 0 : _sdk$currentUser3.userId)) return;
      channelMarkAsRead();
      updateMessages([message], false, (_sdk$currentUser4 = sdk.currentUser) === null || _sdk$currentUser4 === void 0 ? void 0 : _sdk$currentUser4.userId);
      if (options !== null && options !== void 0 && (_options$shouldCountN = options.shouldCountNewMessages) !== null && _options$shouldCountN !== void 0 && _options$shouldCountN.call(options)) {
        var _sdk$currentUser5;
        updateNewMessages([message], false, (_sdk$currentUser5 = sdk.currentUser) === null || _sdk$currentUser5 === void 0 ? void 0 : _sdk$currentUser5.userId);
      }
      if (options !== null && options !== void 0 && options.onMessagesReceived) {
        options.onMessagesReceived([message]);
      }
    },
    onMessageUpdated(eventChannel, message) {
      var _sdk$currentUser6, _sdk$currentUser7;
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if ((0, _uikitUtils.isMyMessage)(message, (_sdk$currentUser6 = sdk.currentUser) === null || _sdk$currentUser6 === void 0 ? void 0 : _sdk$currentUser6.userId)) return;
      updateMessages([message], false, (_sdk$currentUser7 = sdk.currentUser) === null || _sdk$currentUser7 === void 0 ? void 0 : _sdk$currentUser7.userId);
    },
    onMessageDeleted(eventChannel, messageId) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      deleteMessages([messageId], []);
      deleteNewMessages([messageId], []);
    },
    async onReactionUpdated(eventChannel, reactionEvent) {
      var _sdk$currentUser8;
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      const message = await sdk.message.getMessage({
        messageId: reactionEvent.messageId,
        includeReactions: true,
        includeParentMessageInfo: true,
        includeThreadInfo: true,
        includeMetaArray: true,
        channelUrl: channel.url,
        channelType: channel.channelType
      });
      if (message) updateMessages([message], false, (_sdk$currentUser8 = sdk.currentUser) === null || _sdk$currentUser8 === void 0 ? void 0 : _sdk$currentUser8.userId);
    },
    // Channels
    onChannelChanged: channelUpdater,
    onChannelFrozen: channelUpdater,
    onChannelUnfrozen: channelUpdater,
    onChannelHidden: channelUpdater,
    onChannelMemberCountChanged(channels) {
      const foundChannel = channels.find(c => !(0, _uikitUtils.isDifferentChannel)(c, channel));
      if (foundChannel) channelUpdater(foundChannel);
    },
    onChannelDeleted(channelUrl) {
      var _options$onChannelDel;
      if (channel.url === channelUrl) options === null || options === void 0 ? void 0 : (_options$onChannelDel = options.onChannelDeleted) === null || _options$onChannelDel === void 0 ? void 0 : _options$onChannelDel.call(options);
    },
    // Users
    onOperatorUpdated: channelUpdater,
    onUserLeft: channelUpdater,
    // onUserEntered: channelUpdater,
    // onUserExited: channelUpdater,
    onUserJoined: channelUpdater,
    onUserUnbanned: channelUpdater,
    onUserMuted: channelUpdater,
    onUserUnmuted: channelUpdater,
    onUserBanned(eventChannel, bannedUser) {
      var _sdk$currentUser9;
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (bannedUser.userId === ((_sdk$currentUser9 = sdk.currentUser) === null || _sdk$currentUser9 === void 0 ? void 0 : _sdk$currentUser9.userId)) {
        var _options$onChannelDel2;
        options === null || options === void 0 ? void 0 : (_options$onChannelDel2 = options.onChannelDeleted) === null || _options$onChannelDel2 === void 0 ? void 0 : _options$onChannelDel2.call(options);
      } else {
        channelUpdater(eventChannel);
      }
    }
  });
  (0, _uikitUtils.useAsyncEffect)(async () => {
    updateLoading(true);
    await init(userId);
    updateLoading(false);
  }, [channel.url, userId]);
  const refresh = (0, _uikitUtils.useFreshCallback)(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const prev = (0, _uikitUtils.useFreshCallback)(async () => {
    var _queryRef$current3;
    if (queryRef.current && (_queryRef$current3 = queryRef.current) !== null && _queryRef$current3 !== void 0 && _queryRef$current3.hasNext) {
      var _queryRef$current4, _sdk$currentUser10;
      const list = await ((_queryRef$current4 = queryRef.current) === null || _queryRef$current4 === void 0 ? void 0 : _queryRef$current4.load());
      updateMessages(list, false, (_sdk$currentUser10 = sdk.currentUser) === null || _sdk$currentUser10 === void 0 ? void 0 : _sdk$currentUser10.userId);
    }
  });
  const hasPrev = (0, _uikitUtils.useFreshCallback)(() => {
    var _queryRef$current5;
    return ((_queryRef$current5 = queryRef.current) === null || _queryRef$current5 === void 0 ? void 0 : _queryRef$current5.hasNext) ?? false;
  });
  const next = (0, _uikitUtils.useFreshCallback)(_uikitUtils.ASYNC_NOOP);
  const hasNext = (0, _uikitUtils.useFreshCallback)(() => false);
  const sendUserMessage = (0, _uikitUtils.useFreshCallback)((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isUserMessage()) {
          var _sdk$currentUser11;
          updateMessages([pendingMessage], false, (_sdk$currentUser11 = sdk.currentUser) === null || _sdk$currentUser11 === void 0 ? void 0 : _sdk$currentUser11.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isUserMessage()) {
          var _sdk$currentUser12;
          updateMessages([sentMessage], false, (_sdk$currentUser12 = sdk.currentUser) === null || _sdk$currentUser12 === void 0 ? void 0 : _sdk$currentUser12.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, failedMessage) => {
        if (failedMessage) {
          var _sdk$currentUser13;
          updateMessages([failedMessage], false, (_sdk$currentUser13 = sdk.currentUser) === null || _sdk$currentUser13 === void 0 ? void 0 : _sdk$currentUser13.userId);
        }
        reject(err);
      });
    });
  });
  const sendFileMessage = (0, _uikitUtils.useFreshCallback)((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendFileMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isFileMessage()) {
          var _sdk$currentUser14;
          updateMessages([pendingMessage], false, (_sdk$currentUser14 = sdk.currentUser) === null || _sdk$currentUser14 === void 0 ? void 0 : _sdk$currentUser14.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isFileMessage()) {
          var _sdk$currentUser15;
          updateMessages([sentMessage], false, (_sdk$currentUser15 = sdk.currentUser) === null || _sdk$currentUser15 === void 0 ? void 0 : _sdk$currentUser15.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, failedMessage) => {
        if (failedMessage) {
          var _sdk$currentUser16;
          updateMessages([failedMessage], false, (_sdk$currentUser16 = sdk.currentUser) === null || _sdk$currentUser16 === void 0 ? void 0 : _sdk$currentUser16.userId);
        }
        reject(err);
      });
    });
  });
  const updateUserMessage = (0, _uikitUtils.useFreshCallback)(async (messageId, params) => {
    var _sdk$currentUser17;
    const updatedMessage = await channel.updateUserMessage(messageId, params);
    updateMessages([updatedMessage], false, (_sdk$currentUser17 = sdk.currentUser) === null || _sdk$currentUser17 === void 0 ? void 0 : _sdk$currentUser17.userId);
    return updatedMessage;
  });
  const updateFileMessage = (0, _uikitUtils.useFreshCallback)(async (messageId, params) => {
    var _sdk$currentUser18;
    const updatedMessage = await channel.updateFileMessage(messageId, params);
    updateMessages([updatedMessage], false, (_sdk$currentUser18 = sdk.currentUser) === null || _sdk$currentUser18 === void 0 ? void 0 : _sdk$currentUser18.userId);
    return updatedMessage;
  });
  const resendMessage = (0, _uikitUtils.useFreshCallback)(async failedMessage => {
    var _sdk$currentUser19;
    const message = await (() => {
      if (failedMessage.isUserMessage()) return channel.resendUserMessage(failedMessage);
      if (failedMessage.isFileMessage()) return channel.resendFileMessage(failedMessage);
      return null;
    })();
    if (message) updateMessages([message], false, (_sdk$currentUser19 = sdk.currentUser) === null || _sdk$currentUser19 === void 0 ? void 0 : _sdk$currentUser19.userId);
  });
  const deleteMessage = (0, _uikitUtils.useFreshCallback)(async message => {
    if (message.sendingStatus === 'succeeded') {
      if (message.isUserMessage()) await channel.deleteMessage(message);
      if (message.isFileMessage()) await channel.deleteMessage(message);
    } else {
      deleteMessages([message.messageId], [message.reqId]);
    }
  });
  const resetNewMessages = (0, _uikitUtils.useFreshCallback)(() => {
    var _sdk$currentUser20;
    updateNewMessages([], true, (_sdk$currentUser20 = sdk.currentUser) === null || _sdk$currentUser20 === void 0 ? void 0 : _sdk$currentUser20.userId);
  });
  return {
    loading,
    refreshing,
    refresh,
    messages,
    newMessages,
    resetNewMessages,
    next,
    hasNext,
    prev,
    hasPrev,
    sendUserMessage,
    sendFileMessage,
    updateUserMessage,
    updateFileMessage,
    resendMessage,
    deleteMessage,
    resetWithStartingPoint() {
      _uikitUtils.Logger.warn('resetWithStartingPoint is not supported in Query, please use Collection instead.');
    }
  };
};
exports.useGroupChannelMessagesWithQuery = useGroupChannelMessagesWithQuery;
//# sourceMappingURL=useGroupChannelMessagesWithQuery.js.map