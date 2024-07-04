"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupChannelContextsProvider = exports.GroupChannelContexts = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ProviderLayout = _interopRequireDefault(require("../../../components/ProviderLayout"));
var _constants = require("../../../constants");
var _useContext = require("../../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelContexts = {
  Fragment: /*#__PURE__*/(0, _react.createContext)({
    headerTitle: '',
    channel: {},
    setMessageToEdit: _uikitUtils.NOOP,
    setMessageToReply: _uikitUtils.NOOP
  }),
  TypingIndicator: /*#__PURE__*/(0, _react.createContext)({
    typingUsers: []
  }),
  PubSub: /*#__PURE__*/(0, _react.createContext)({
    publish: _uikitUtils.NOOP,
    subscribe: () => _uikitUtils.NOOP
  }),
  MessageList: /*#__PURE__*/(0, _react.createContext)({
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
exports.GroupChannelContexts = GroupChannelContexts;
const GroupChannelContextsProvider = _ref => {
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
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelContextsProvider');
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    currentUser,
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const [typingUsers, setTypingUsers] = (0, _react.useState)([]);
  const [messageToEdit, setMessageToEdit] = (0, _react.useState)();
  const [messageToReply, setMessageToReply] = (0, _react.useState)();
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
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
    onMessageDeleted(_, messageId) {
      if ((messageToReply === null || messageToReply === void 0 ? void 0 : messageToReply.messageId) === messageId) {
        setMessageToReply(undefined);
      }
    },
    onChannelFrozen(frozenChannel) {
      if (frozenChannel.url === channel.url) {
        if (frozenChannel.isGroupChannel() && (0, _uikitUtils.getGroupChannelChatAvailableState)(channel).frozen) {
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
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (!enableTypingIndicator) return;
      setTypingUsers(eventChannel.getTypingUsers());
    }
  });
  return /*#__PURE__*/_react.default.createElement(_ProviderLayout.default, null, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.GROUP_CHANNEL.HEADER_TITLE((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? '', channel),
      channel,
      keyboardAvoidOffset,
      messageToEdit,
      setMessageToEdit: (0, _react.useCallback)(message => updateInputMode('edit', message), []),
      messageToReply,
      setMessageToReply: (0, _react.useCallback)(message => updateInputMode('reply', message), [])
    }
  }, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.PubSub.Provider, {
    value: groupChannelPubSub
  }, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.TypingIndicator.Provider, {
    value: {
      typingUsers
    }
  }, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.MessageList.Provider, {
    value: {
      flatListRef,
      scrollToMessage,
      lazyScrollToIndex,
      lazyScrollToBottom
    }
  }, children)))));
};
exports.GroupChannelContextsProvider = GroupChannelContextsProvider;
const useScrollActions = params => {
  const {
    messages,
    onUpdateSearchItem
  } = params;
  const flatListRef = (0, _react.useRef)(null);

  // FIXME: Workaround, should run after data has been applied to UI.
  const lazyScrollToBottom = (0, _uikitUtils.useFreshCallback)(params => {
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
  const lazyScrollToIndex = (0, _uikitUtils.useFreshCallback)(params => {
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
  const scrollToMessage = (0, _uikitUtils.useFreshCallback)((messageId, options) => {
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
        }), _constants.MESSAGE_FOCUS_ANIMATION_DELAY);
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
  _uikitUtils.Logger.warn('Cannot find flatListRef.current, please render FlatList and pass the flatListRef' + 'or please try again after FlatList has been rendered.');
};
//# sourceMappingURL=moduleContext.js.map