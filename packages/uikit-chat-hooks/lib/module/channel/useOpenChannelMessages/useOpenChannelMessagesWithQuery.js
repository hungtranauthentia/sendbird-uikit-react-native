import { useRef } from 'react';
import { ASYNC_NOOP, NOOP, isDifferentChannel, isMyMessage, useAsyncEffect, useForceUpdate, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import { useChannelHandler } from '../../handler/useChannelHandler';
import { useConnectionHandler } from '../../handler/useConnectionHandler';
import { useChannelMessagesReducer } from '../useChannelMessagesReducer';
const createMessageQuery = (channel, creator) => {
  if (creator) return creator();
  return channel.createPreviousMessageListQuery({
    limit: 100,
    reverse: true
  });
};
export const useOpenChannelMessagesWithQuery = (sdk, channel, userId, options) => {
  const queryRef = useRef();
  const forceUpdate = useForceUpdate();
  const handlerId = useUniqHandlerId('useOpenChannelMessagesWithQuery');
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
  } = useChannelMessagesReducer(options === null || options === void 0 ? void 0 : options.sortComparator);
  const init = useFreshCallback(async uid => {
    if (uid) {
      var _queryRef$current, _sdk$currentUser2;
      queryRef.current = createMessageQuery(channel, options === null || options === void 0 ? void 0 : options.queryCreator);
      if ((_queryRef$current = queryRef.current) !== null && _queryRef$current !== void 0 && _queryRef$current.hasNext) {
        var _queryRef$current2, _sdk$currentUser;
        const list = await ((_queryRef$current2 = queryRef.current) === null || _queryRef$current2 === void 0 ? void 0 : _queryRef$current2.load());
        updateMessages(list, true, (_sdk$currentUser = sdk.currentUser) === null || _sdk$currentUser === void 0 ? void 0 : _sdk$currentUser.userId);
      }
      updateNewMessages([], true, (_sdk$currentUser2 = sdk.currentUser) === null || _sdk$currentUser2 === void 0 ? void 0 : _sdk$currentUser2.userId);
    }
  });
  const channelUpdater = channel => {
    if (channel.isOpenChannel() && !isDifferentChannel(channel, channel)) {
      forceUpdate();
    }
  };
  useConnectionHandler(sdk, handlerId, {
    async onReconnectSucceeded() {
      var _queryRef$current3, _queryRef$current4, _queryRef$current5, _queryRef$current6, _queryRef$current7, _queryRef$current8, _queryRef$current9, _queryRef$current10, _queryRef$current11, _queryRef$current12, _queryRef$current13, _queryRef$current14, _queryRef$current15, _queryRef$current16, _queryRef$current17, _queryRef$current18, _sdk$currentUser3;
      const lastMessage = messages[0];
      if (!lastMessage) return;
      const messageContext = {
        updatedMessages: [],
        addedMessages: [],
        deletedMessageIds: []
      };
      const changeLogsContext = {
        hasMore: false,
        token: ''
      };
      const messageQueryContext = {
        hasMore: false,
        timestamp: lastMessage.createdAt
      };

      // Updated & Deleted messages
      const changelogsParams = {
        replyType: (_queryRef$current3 = queryRef.current) === null || _queryRef$current3 === void 0 ? void 0 : _queryRef$current3.replyType,
        includeMetaArray: (_queryRef$current4 = queryRef.current) === null || _queryRef$current4 === void 0 ? void 0 : _queryRef$current4.includeMetaArray,
        includeReactions: (_queryRef$current5 = queryRef.current) === null || _queryRef$current5 === void 0 ? void 0 : _queryRef$current5.includeReactions,
        includeThreadInfo: (_queryRef$current6 = queryRef.current) === null || _queryRef$current6 === void 0 ? void 0 : _queryRef$current6.includeThreadInfo,
        includeParentMessageInfo: (_queryRef$current7 = queryRef.current) === null || _queryRef$current7 === void 0 ? void 0 : _queryRef$current7.includeParentMessageInfo
      };
      const changeLogsByTS = await channel.getMessageChangeLogsSinceTimestamp(lastMessage.createdAt);
      changeLogsContext.token = changeLogsByTS.token;
      changeLogsContext.hasMore = changeLogsByTS.hasMore;
      messageContext.updatedMessages.push(...changeLogsByTS.updatedMessages);
      messageContext.deletedMessageIds.push(...changeLogsByTS.deletedMessageIds);
      while (changeLogsContext.hasMore) {
        const changeLogsByToken = await channel.getMessageChangeLogsSinceToken(changeLogsByTS.token, changelogsParams);
        changeLogsContext.token = changeLogsByToken.token;
        changeLogsContext.hasMore = changeLogsByToken.hasMore;
        messageContext.updatedMessages.push(...changeLogsByToken.updatedMessages);
        messageContext.deletedMessageIds.push(...changeLogsByToken.deletedMessageIds);
      }

      // Added messages
      const messageQueryParams = {
        prevResultSize: 0,
        nextResultSize: ((_queryRef$current8 = queryRef.current) === null || _queryRef$current8 === void 0 ? void 0 : _queryRef$current8.limit) ?? 100,
        reverse: (_queryRef$current9 = queryRef.current) === null || _queryRef$current9 === void 0 ? void 0 : _queryRef$current9.reverse,
        includeParentMessageInfo: (_queryRef$current10 = queryRef.current) === null || _queryRef$current10 === void 0 ? void 0 : _queryRef$current10.includeParentMessageInfo,
        includeThreadInfo: (_queryRef$current11 = queryRef.current) === null || _queryRef$current11 === void 0 ? void 0 : _queryRef$current11.includeThreadInfo,
        includeReactions: (_queryRef$current12 = queryRef.current) === null || _queryRef$current12 === void 0 ? void 0 : _queryRef$current12.includeReactions,
        includeMetaArray: (_queryRef$current13 = queryRef.current) === null || _queryRef$current13 === void 0 ? void 0 : _queryRef$current13.includeMetaArray,
        replyType: (_queryRef$current14 = queryRef.current) === null || _queryRef$current14 === void 0 ? void 0 : _queryRef$current14.replyType,
        customTypesFilter: (_queryRef$current15 = queryRef.current) === null || _queryRef$current15 === void 0 ? void 0 : _queryRef$current15.customTypesFilter,
        messageTypeFilter: (_queryRef$current16 = queryRef.current) === null || _queryRef$current16 === void 0 ? void 0 : _queryRef$current16.messageTypeFilter,
        senderUserIdsFilter: (_queryRef$current17 = queryRef.current) === null || _queryRef$current17 === void 0 ? void 0 : _queryRef$current17.senderUserIdsFilter,
        showSubchannelMessagesOnly: (_queryRef$current18 = queryRef.current) === null || _queryRef$current18 === void 0 ? void 0 : _queryRef$current18.showSubchannelMessagesOnly
      };
      const queriedMessages = await channel.getMessagesByTimestamp(lastMessage.createdAt, messageQueryParams);
      messageQueryContext.hasMore = queriedMessages.length > 0;
      if (messageQueryContext.hasMore) {
        messageQueryContext.timestamp = queriedMessages[0].createdAt;
        messageContext.addedMessages.unshift(...queriedMessages);
      }
      while (messageQueryContext.hasMore) {
        const queriedMessages = await channel.getMessagesByTimestamp(messageQueryContext.timestamp, messageQueryParams);
        messageQueryContext.hasMore = queriedMessages.length > 0;
        if (messageQueryContext.hasMore) {
          messageQueryContext.timestamp = queriedMessages[0].createdAt;
          messageContext.addedMessages.unshift(...queriedMessages);
        }
      }

      // Update to View
      updateMessages([...messageContext.addedMessages, ...messageContext.updatedMessages], false, (_sdk$currentUser3 = sdk.currentUser) === null || _sdk$currentUser3 === void 0 ? void 0 : _sdk$currentUser3.userId);
      deleteMessages(messageContext.deletedMessageIds, []);
      if (messageContext.addedMessages.length > 0) {
        var _options$shouldCountN;
        if (options !== null && options !== void 0 && (_options$shouldCountN = options.shouldCountNewMessages) !== null && _options$shouldCountN !== void 0 && _options$shouldCountN.call(options)) {
          var _sdk$currentUser4;
          updateNewMessages(messageContext.addedMessages, false, (_sdk$currentUser4 = sdk.currentUser) === null || _sdk$currentUser4 === void 0 ? void 0 : _sdk$currentUser4.userId);
        }
        if (options !== null && options !== void 0 && options.onMessagesReceived) {
          options.onMessagesReceived(messageContext.addedMessages);
        }
      }
    }
  });
  useChannelHandler(sdk, handlerId, {
    // Messages
    onMessageReceived(eventChannel, message) {
      var _sdk$currentUser5, _sdk$currentUser6, _options$shouldCountN2;
      if (isDifferentChannel(channel, eventChannel)) return;
      if (isMyMessage(message, (_sdk$currentUser5 = sdk.currentUser) === null || _sdk$currentUser5 === void 0 ? void 0 : _sdk$currentUser5.userId)) return;
      updateMessages([message], false, (_sdk$currentUser6 = sdk.currentUser) === null || _sdk$currentUser6 === void 0 ? void 0 : _sdk$currentUser6.userId);
      if (options !== null && options !== void 0 && (_options$shouldCountN2 = options.shouldCountNewMessages) !== null && _options$shouldCountN2 !== void 0 && _options$shouldCountN2.call(options)) {
        var _sdk$currentUser7;
        updateNewMessages([message], false, (_sdk$currentUser7 = sdk.currentUser) === null || _sdk$currentUser7 === void 0 ? void 0 : _sdk$currentUser7.userId);
      }
      if (options !== null && options !== void 0 && options.onMessagesReceived) {
        options.onMessagesReceived([message]);
      }
    },
    onMessageUpdated(eventChannel, message) {
      var _sdk$currentUser8, _sdk$currentUser9;
      if (isDifferentChannel(channel, eventChannel)) return;
      if (isMyMessage(message, (_sdk$currentUser8 = sdk.currentUser) === null || _sdk$currentUser8 === void 0 ? void 0 : _sdk$currentUser8.userId)) return;
      updateMessages([message], false, (_sdk$currentUser9 = sdk.currentUser) === null || _sdk$currentUser9 === void 0 ? void 0 : _sdk$currentUser9.userId);
    },
    onMessageDeleted(eventChannel, messageId) {
      if (isDifferentChannel(channel, eventChannel)) return;
      deleteMessages([messageId], []);
      deleteNewMessages([messageId], []);
    },
    // Channels
    onChannelChanged: channelUpdater,
    onChannelFrozen: channelUpdater,
    onChannelUnfrozen: channelUpdater,
    onChannelParticipantCountChanged(eventChannel) {
      if (isDifferentChannel(channel, eventChannel)) return;
      channelUpdater(eventChannel);
    },
    onChannelDeleted(channelUrl, type) {
      if (channel.url === channelUrl && type === 'open') {
        var _options$onChannelDel;
        options === null || options === void 0 ? void 0 : (_options$onChannelDel = options.onChannelDeleted) === null || _options$onChannelDel === void 0 ? void 0 : _options$onChannelDel.call(options);
      }
    },
    // Users
    onOperatorUpdated: channelUpdater,
    onUserUnbanned: channelUpdater,
    onUserMuted: channelUpdater,
    onUserUnmuted: channelUpdater,
    onUserBanned(eventChannel, bannedUser) {
      var _sdk$currentUser10;
      if (isDifferentChannel(channel, eventChannel)) return;
      if (bannedUser.userId === ((_sdk$currentUser10 = sdk.currentUser) === null || _sdk$currentUser10 === void 0 ? void 0 : _sdk$currentUser10.userId)) {
        var _options$onChannelDel2;
        options === null || options === void 0 ? void 0 : (_options$onChannelDel2 = options.onChannelDeleted) === null || _options$onChannelDel2 === void 0 ? void 0 : _options$onChannelDel2.call(options);
      } else {
        channelUpdater(eventChannel);
      }
    }
  }, 'open');
  useAsyncEffect(async () => {
    updateLoading(true);
    try {
      await channel.enter();
      await init(userId);
    } catch (error) {
      var _options$onError, _options$onChannelDel3;
      options === null || options === void 0 ? void 0 : (_options$onError = options.onError) === null || _options$onError === void 0 ? void 0 : _options$onError.call(options, error);
      options === null || options === void 0 ? void 0 : (_options$onChannelDel3 = options.onChannelDeleted) === null || _options$onChannelDel3 === void 0 ? void 0 : _options$onChannelDel3.call(options);
    } finally {
      updateLoading(false);
    }
    return () => {
      channel.exit().catch(NOOP);
    };
  }, [channel.url, userId]);
  const refresh = useFreshCallback(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const prev = useFreshCallback(async () => {
    var _queryRef$current19;
    if (queryRef.current && (_queryRef$current19 = queryRef.current) !== null && _queryRef$current19 !== void 0 && _queryRef$current19.hasNext) {
      var _queryRef$current20, _sdk$currentUser11;
      const list = await ((_queryRef$current20 = queryRef.current) === null || _queryRef$current20 === void 0 ? void 0 : _queryRef$current20.load());
      updateMessages(list, false, (_sdk$currentUser11 = sdk.currentUser) === null || _sdk$currentUser11 === void 0 ? void 0 : _sdk$currentUser11.userId);
    }
  });
  const hasPrev = useFreshCallback(() => {
    var _queryRef$current21;
    return ((_queryRef$current21 = queryRef.current) === null || _queryRef$current21 === void 0 ? void 0 : _queryRef$current21.hasNext) ?? false;
  });
  const next = useFreshCallback(ASYNC_NOOP);
  const hasNext = useFreshCallback(() => false);
  const sendUserMessage = useFreshCallback((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isUserMessage()) {
          var _sdk$currentUser12;
          updateMessages([pendingMessage], false, (_sdk$currentUser12 = sdk.currentUser) === null || _sdk$currentUser12 === void 0 ? void 0 : _sdk$currentUser12.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isUserMessage()) {
          var _sdk$currentUser13;
          updateMessages([sentMessage], false, (_sdk$currentUser13 = sdk.currentUser) === null || _sdk$currentUser13 === void 0 ? void 0 : _sdk$currentUser13.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, failedMessage) => {
        if (failedMessage) {
          var _sdk$currentUser14;
          updateMessages([failedMessage], false, (_sdk$currentUser14 = sdk.currentUser) === null || _sdk$currentUser14 === void 0 ? void 0 : _sdk$currentUser14.userId);
        }
        reject(err);
      });
    });
  });
  const sendFileMessage = useFreshCallback((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendFileMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isFileMessage()) {
          var _sdk$currentUser15;
          updateMessages([pendingMessage], false, (_sdk$currentUser15 = sdk.currentUser) === null || _sdk$currentUser15 === void 0 ? void 0 : _sdk$currentUser15.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isFileMessage()) {
          var _sdk$currentUser16;
          updateMessages([sentMessage], false, (_sdk$currentUser16 = sdk.currentUser) === null || _sdk$currentUser16 === void 0 ? void 0 : _sdk$currentUser16.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, failedMessage) => {
        if (failedMessage) {
          var _sdk$currentUser17;
          updateMessages([failedMessage], false, (_sdk$currentUser17 = sdk.currentUser) === null || _sdk$currentUser17 === void 0 ? void 0 : _sdk$currentUser17.userId);
        }
        reject(err);
      });
    });
  });
  const updateUserMessage = useFreshCallback(async (messageId, params) => {
    var _sdk$currentUser18;
    const updatedMessage = await channel.updateUserMessage(messageId, params);
    updateMessages([updatedMessage], false, (_sdk$currentUser18 = sdk.currentUser) === null || _sdk$currentUser18 === void 0 ? void 0 : _sdk$currentUser18.userId);
    return updatedMessage;
  });
  const updateFileMessage = useFreshCallback(async (messageId, params) => {
    var _sdk$currentUser19;
    const updatedMessage = await channel.updateFileMessage(messageId, params);
    updateMessages([updatedMessage], false, (_sdk$currentUser19 = sdk.currentUser) === null || _sdk$currentUser19 === void 0 ? void 0 : _sdk$currentUser19.userId);
    return updatedMessage;
  });
  const resendMessage = useFreshCallback(async failedMessage => {
    var _sdk$currentUser20;
    const message = await (() => {
      if (failedMessage.isUserMessage()) return channel.resendUserMessage(failedMessage);
      if (failedMessage.isFileMessage()) return channel.resendFileMessage(failedMessage);
      return null;
    })();
    if (message) updateMessages([message], false, (_sdk$currentUser20 = sdk.currentUser) === null || _sdk$currentUser20 === void 0 ? void 0 : _sdk$currentUser20.userId);
  });
  const deleteMessage = useFreshCallback(async message => {
    if (message.sendingStatus === 'succeeded') {
      if (message.isUserMessage()) await channel.deleteMessage(message);
      if (message.isFileMessage()) await channel.deleteMessage(message);
    } else {
      deleteMessages([message.messageId], [message.reqId]);
    }
  });
  const resetNewMessages = useFreshCallback(() => {
    var _sdk$currentUser21;
    updateNewMessages([], true, (_sdk$currentUser21 = sdk.currentUser) === null || _sdk$currentUser21 === void 0 ? void 0 : _sdk$currentUser21.userId);
  });
  return {
    loading,
    refreshing,
    refresh,
    messages,
    newMessages,
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
    resetNewMessages
  };
};
//# sourceMappingURL=useOpenChannelMessagesWithQuery.js.map