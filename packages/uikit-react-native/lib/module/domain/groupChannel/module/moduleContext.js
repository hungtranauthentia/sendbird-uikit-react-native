import React, { createContext, useCallback, useRef, useState } from 'react';
import { useChannelHandler } from '@sendbird/uikit-chat-hooks';
import { Logger, NOOP, getGroupChannelChatAvailableState, isDifferentChannel, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import ProviderLayout from '../../../components/ProviderLayout';
import { MESSAGE_FOCUS_ANIMATION_DELAY } from '../../../constants';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
export const GroupChannelContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    channel: {},
    setMessageToEdit: NOOP,
    setMessageToReply: NOOP
  }),
  TypingIndicator: /*#__PURE__*/createContext({
    typingUsers: []
  }),
  PubSub: /*#__PURE__*/createContext({
    publish: NOOP,
    subscribe: () => NOOP
  }),
  MessageList: /*#__PURE__*/createContext({
    flatListRef: {
      current: null
    },
    scrollToMessage: () => false,
    lazyScrollToBottom: () => {
      // noop
    },
    lazyScrollToIndex: () => {
      // noop
    }
  })
};
export const GroupChannelContextsProvider = _ref => {
  let {
    children,
    channel,
    enableTypingIndicator,
    keyboardAvoidOffset = 0,
    groupChannelPubSub,
    messages,
    onUpdateSearchItem
  } = _ref;
  if (!channel) throw new Error('GroupChannel is not provided to GroupChannelModule');
  const handlerId = useUniqHandlerId('GroupChannelContextsProvider');
  const {
    STRINGS
  } = useLocalization();
  const {
    currentUser,
    sdk
  } = useSendbirdChat();
  const [typingUsers, setTypingUsers] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState();
  const [messageToReply, setMessageToReply] = useState();
  const {
    flatListRef,
    lazyScrollToIndex,
    lazyScrollToBottom,
    scrollToMessage
  } = useScrollActions({
    messages,
    onUpdateSearchItem
  });
  const updateInputMode = (mode, message) => {
    if (mode === 'send' || !message) {
      setMessageToEdit(undefined);
      setMessageToReply(undefined);
      return;
    } else if (mode === 'edit') {
      setMessageToEdit(message);
      setMessageToReply(undefined);
      return;
    } else if (mode === 'reply') {
      setMessageToEdit(undefined);
      setMessageToReply(message);
      return;
    }
  };
  useChannelHandler(sdk, handlerId, {
    onMessageDeleted(_, messageId) {
      if ((messageToReply === null || messageToReply === void 0 ? void 0 : messageToReply.messageId) === messageId) {
        setMessageToReply(undefined);
      }
    },
    onChannelFrozen(frozenChannel) {
      if (frozenChannel.url === channel.url) {
        if (frozenChannel.isGroupChannel() && getGroupChannelChatAvailableState(channel).frozen) {
          setMessageToReply(undefined);
        }
      }
    },
    onUserMuted(mutedChannel, user) {
      var _sdk$currentUser;
      if (mutedChannel.url === channel.url && user.userId === ((_sdk$currentUser = sdk.currentUser) === null || _sdk$currentUser === void 0 ? void 0 : _sdk$currentUser.userId)) {
        setMessageToReply(undefined);
      }
    },
    onTypingStatusUpdated(eventChannel) {
      if (isDifferentChannel(channel, eventChannel)) return;
      if (!enableTypingIndicator) return;
      setTypingUsers(eventChannel.getTypingUsers());
    }
  });
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(GroupChannelContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.GROUP_CHANNEL.HEADER_TITLE((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? '', channel),
      channel,
      keyboardAvoidOffset,
      messageToEdit,
      setMessageToEdit: useCallback(message => updateInputMode('edit', message), []),
      messageToReply,
      setMessageToReply: useCallback(message => updateInputMode('reply', message), [])
    }
  }, /*#__PURE__*/React.createElement(GroupChannelContexts.PubSub.Provider, {
    value: groupChannelPubSub
  }, /*#__PURE__*/React.createElement(GroupChannelContexts.TypingIndicator.Provider, {
    value: {
      typingUsers
    }
  }, /*#__PURE__*/React.createElement(GroupChannelContexts.MessageList.Provider, {
    value: {
      flatListRef,
      scrollToMessage,
      lazyScrollToIndex,
      lazyScrollToBottom
    }
  }, children)))));
};
const useScrollActions = params => {
  const {
    messages,
    onUpdateSearchItem
  } = params;
  const flatListRef = useRef(null);

  // FIXME: Workaround, should run after data has been applied to UI.
  const lazyScrollToBottom = useFreshCallback(params => {
    if (!flatListRef.current) {
      logFlatListRefWarning();
      return;
    }
    setTimeout(() => {
      var _flatListRef$current;
      (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 ? void 0 : _flatListRef$current.scrollToOffset({
        offset: 0,
        animated: (params === null || params === void 0 ? void 0 : params.animated) ?? false
      });
    }, (params === null || params === void 0 ? void 0 : params.timeout) ?? 0);
  });

  // FIXME: Workaround, should run after data has been applied to UI.
  const lazyScrollToIndex = useFreshCallback(params => {
    if (!flatListRef.current) {
      logFlatListRefWarning();
      return;
    }
    setTimeout(() => {
      var _flatListRef$current2;
      (_flatListRef$current2 = flatListRef.current) === null || _flatListRef$current2 === void 0 ? void 0 : _flatListRef$current2.scrollToIndex({
        index: (params === null || params === void 0 ? void 0 : params.index) ?? 0,
        animated: (params === null || params === void 0 ? void 0 : params.animated) ?? false,
        viewPosition: (params === null || params === void 0 ? void 0 : params.viewPosition) ?? 0.5
      });
    }, (params === null || params === void 0 ? void 0 : params.timeout) ?? 0);
  });
  const scrollToMessage = useFreshCallback((messageId, options) => {
    if (!flatListRef.current) {
      logFlatListRefWarning();
      return false;
    }
    const foundMessageIndex = messages.findIndex(it => it.messageId === messageId);
    const isIncludedInList = foundMessageIndex > -1;
    if (isIncludedInList) {
      if (options !== null && options !== void 0 && options.focusAnimated) {
        setTimeout(() => onUpdateSearchItem({
          startingPoint: messages[foundMessageIndex].createdAt
        }), MESSAGE_FOCUS_ANIMATION_DELAY);
      }
      lazyScrollToIndex({
        index: foundMessageIndex,
        animated: true,
        timeout: 0,
        viewPosition: options === null || options === void 0 ? void 0 : options.viewPosition
      });
      return true;
    } else {
      return false;
    }
  });
  return {
    flatListRef,
    lazyScrollToIndex,
    lazyScrollToBottom,
    scrollToMessage
  };
};
const logFlatListRefWarning = () => {
  Logger.warn('Cannot find flatListRef.current, please render FlatList and pass the flatListRef' + 'or please try again after FlatList has been rendered.');
};
//# sourceMappingURL=moduleContext.js.map