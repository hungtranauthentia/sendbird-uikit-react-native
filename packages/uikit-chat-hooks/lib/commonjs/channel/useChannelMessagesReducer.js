"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChannelMessagesReducer = void 0;
var _react = require("react");
var _message = require("@sendbird/chat/message");
var _uikitUtils = require("@sendbird/uikit-utils");
const defaultReducer = (_ref, action) => {
  let {
    ...draft
  } = _ref;
  switch (action.type) {
    case 'update_refreshing':
      {
        draft['refreshing'] = action.value.status;
        return draft;
      }
    case 'update_loading':
      {
        draft['loading'] = action.value.status;
        return draft;
      }
    case 'update_messages':
      {
        const userId = action.value.currentUserId;
        if (action.value.clearBeforeAction) {
          draft['messageMap'] = messagesToObject(action.value.messages);
        } else {
          // Filtering meaningless message updates
          const nextMessages = action.value.messages.filter(next => {
            if ((0, _uikitUtils.isMyMessage)(next, userId)) {
              const prev = draft['messageMap'][next.reqId] ?? draft['messageMap'][next.messageId];
              if ((0, _uikitUtils.isMyMessage)(prev, userId)) {
                const shouldUpdate = shouldUpdateMessage(prev, next);
                if (shouldUpdate) {
                  // Remove existing messages before update to prevent duplicate display
                  delete draft['messageMap'][prev.reqId];
                  delete draft['messageMap'][prev.messageId];
                }
                return shouldUpdate;
              }
            }
            return true;
          });
          const obj = messagesToObject(nextMessages);
          draft['messageMap'] = {
            ...draft['messageMap'],
            ...obj
          };
        }
        return draft;
      }
    case 'update_new_messages':
      {
        const userId = action.value.currentUserId;
        const newMessages = action.value.messages.filter(it => (0, _uikitUtils.isNewMessage)(it, userId));
        if (action.value.clearBeforeAction) {
          draft['newMessageMap'] = (0, _uikitUtils.arrayToMapWithGetter)(newMessages, _uikitUtils.getMessageUniqId);
        } else {
          // Remove existing messages before update to prevent duplicate display
          const messageKeys = newMessages.map(it => it.messageId);
          messageKeys.forEach(key => delete draft['newMessageMap'][key]);
          draft['newMessageMap'] = {
            ...draft['newMessageMap'],
            ...(0, _uikitUtils.arrayToMapWithGetter)(newMessages, _uikitUtils.getMessageUniqId)
          };
        }
        return draft;
      }
    case 'delete_messages':
    case 'delete_new_messages':
      {
        const key = action.type === 'delete_messages' ? 'messageMap' : 'newMessageMap';
        draft[key] = {
          ...draft[key]
        };
        action.value.messageIds.forEach(msgId => {
          const message = draft[key][msgId];
          if (message) {
            if ((0, _uikitUtils.isSendableMessage)(message)) delete draft[key][message.reqId];
            delete draft[key][message.messageId];
          }
        });
        action.value.reqIds.forEach(reqId => {
          const message = draft[key][reqId];
          if (message) {
            if ((0, _uikitUtils.isSendableMessage)(message)) delete draft[key][message.reqId];
            delete draft[key][message.messageId];
          }
        });
        return draft;
      }
  }
};
const messagesToObject = messages => {
  return messages.reduce((accum, curr) => {
    if ((0, _uikitUtils.isSendableMessage)(curr)) {
      accum[curr.reqId] = curr;
      if (curr.sendingStatus === _message.SendingStatus.SUCCEEDED) {
        accum[curr.messageId] = curr;
      }
    } else {
      accum[curr.messageId] = curr;
    }
    return accum;
  }, {});
};
const shouldUpdateMessage = (prev, next) => {
  // message data update (e.g. reactions)
  if (prev.sendingStatus === _message.SendingStatus.SUCCEEDED) return next.sendingStatus === _message.SendingStatus.SUCCEEDED;

  // message sending status update
  return prev.sendingStatus !== next.sendingStatus;
};
const useChannelMessagesReducer = sortComparator => {
  const [{
    loading,
    refreshing,
    messageMap,
    newMessageMap
  }, dispatch] = (0, _react.useReducer)(defaultReducer, {
    loading: true,
    refreshing: false,
    messageMap: {},
    newMessageMap: {}
  });
  const updateMessages = (messages, clearBeforeAction, currentUserId) => {
    dispatch({
      type: 'update_messages',
      value: {
        messages,
        clearBeforeAction,
        currentUserId
      }
    });
  };
  const deleteMessages = (messageIds, reqIds) => {
    dispatch({
      type: 'delete_messages',
      value: {
        messageIds,
        reqIds
      }
    });
  };
  const updateNewMessages = (messages, clearBeforeAction, currentUserId) => {
    dispatch({
      type: 'update_new_messages',
      value: {
        messages,
        clearBeforeAction,
        currentUserId
      }
    });
  };
  const deleteNewMessages = (messageIds, reqIds) => {
    dispatch({
      type: 'delete_new_messages',
      value: {
        messageIds,
        reqIds
      }
    });
  };
  const updateLoading = status => {
    dispatch({
      type: 'update_loading',
      value: {
        status
      }
    });
  };
  const updateRefreshing = status => {
    dispatch({
      type: 'update_refreshing',
      value: {
        status
      }
    });
  };
  const messages = (0, _uikitUtils.useIIFE)(() => {
    if (sortComparator) return Array.from(new Set(Object.values(messageMap))).sort(sortComparator);
    return Array.from(new Set(Object.values(messageMap)));
  });
  const newMessages = Object.values(newMessageMap);
  return {
    updateLoading,
    updateRefreshing,
    updateMessages,
    deleteMessages,
    loading,
    refreshing,
    messages,
    newMessages,
    updateNewMessages,
    deleteNewMessages
  };
};
exports.useChannelMessagesReducer = useChannelMessagesReducer;
//# sourceMappingURL=useChannelMessagesReducer.js.map