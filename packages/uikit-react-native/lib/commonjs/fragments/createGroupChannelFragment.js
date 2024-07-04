"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _groupChannel = require("@sendbird/chat/groupChannel");
var _message = require("@sendbird/chat/message");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitTools = require("@sendbird/uikit-tools");
var _uikitUtils = require("@sendbird/uikit-utils");
var _GroupChannelMessageRenderer = _interopRequireWildcard(require("../components/GroupChannelMessageRenderer"));
var _NewMessagesButton = _interopRequireDefault(require("../components/NewMessagesButton"));
var _ScrollToBottomButton = _interopRequireDefault(require("../components/ScrollToBottomButton"));
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _createGroupChannelModule = _interopRequireDefault(require("../domain/groupChannel/module/createGroupChannelModule"));
var _useContext = require("../hooks/useContext");
var _pubsub = _interopRequireDefault(require("../utils/pubsub"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const createGroupChannelFragment = initModule => {
  const GroupChannelModule = (0, _createGroupChannelModule.default)(initModule);
  return _ref => {
    let {
      searchItem,
      renderNewMessagesButton = props => /*#__PURE__*/_react.default.createElement(_NewMessagesButton.default, props),
      renderScrollToBottomButton = props => /*#__PURE__*/_react.default.createElement(_ScrollToBottomButton.default, props),
      renderMessage,
      enableMessageGrouping = true,
      enableTypingIndicator,
      onPressHeaderLeft = _uikitUtils.NOOP,
      onPressHeaderRight = _uikitUtils.NOOP,
      onPressMediaMessage = _uikitUtils.NOOP,
      onChannelDeleted = _uikitUtils.NOOP,
      onBeforeSendUserMessage = _uikitUtils.PASS,
      onBeforeSendFileMessage = _uikitUtils.PASS,
      onBeforeUpdateUserMessage = _uikitUtils.PASS,
      onBeforeUpdateFileMessage = _uikitUtils.PASS,
      channel,
      keyboardAvoidOffset,
      sortComparator = _uikitUtils.messageComparator,
      flatListProps,
      messageListQueryParams,
      collectionCreator
    } = _ref;
    const {
      playerService,
      recorderService
    } = (0, _useContext.usePlatformService)();
    const {
      sdk,
      currentUser,
      sbOptions
    } = (0, _useContext.useSendbirdChat)();
    const [internalSearchItem, setInternalSearchItem] = (0, _react.useState)(searchItem);
    const navigateFromMessageSearch = (0, _react.useCallback)(() => Boolean(searchItem), []);
    const [groupChannelPubSub] = (0, _react.useState)(() => (0, _pubsub.default)());
    const [scrolledAwayFromBottom, setScrolledAwayFromBottom] = (0, _react.useState)(false);
    const scrolledAwayFromBottomRef = (0, _uikitUtils.useRefTracker)(scrolledAwayFromBottom);
    const replyType = (0, _uikitUtils.useIIFE)(() => {
      if (sbOptions.uikit.groupChannel.channel.replyType === 'none') return _message.ReplyType.NONE;else return _message.ReplyType.ONLY_REPLY_TO_CHANNEL;
    });
    const {
      loading,
      messages,
      newMessages,
      resetNewMessages,
      loadNext,
      loadPrevious,
      hasNext,
      sendFileMessage,
      sendUserMessage,
      updateFileMessage,
      updateUserMessage,
      resendMessage,
      deleteMessage,
      resetWithStartingPoint
    } = (0, _uikitTools.useGroupChannelMessages)(sdk, channel, {
      shouldCountNewMessages: () => scrolledAwayFromBottomRef.current,
      onMessagesReceived(messages) {
        groupChannelPubSub.publish({
          type: 'MESSAGES_RECEIVED',
          data: {
            messages
          }
        });
      },
      onMessagesUpdated(messages) {
        groupChannelPubSub.publish({
          type: 'MESSAGES_UPDATED',
          data: {
            messages
          }
        });
      },
      onChannelDeleted,
      onCurrentUserBanned: onChannelDeleted,
      collectionCreator: getCollectionCreator(channel, messageListQueryParams, collectionCreator),
      sortComparator,
      markAsRead: _uikitUtils.confirmAndMarkAsRead,
      replyType,
      startingPoint: internalSearchItem === null || internalSearchItem === void 0 ? void 0 : internalSearchItem.startingPoint
    });
    const onBlurFragment = () => {
      return Promise.allSettled([playerService.reset(), recorderService.reset()]);
    };
    const _onPressHeaderLeft = (0, _uikitUtils.useFreshCallback)(async () => {
      await onBlurFragment();
      onPressHeaderLeft();
    });
    const _onPressHeaderRight = (0, _uikitUtils.useFreshCallback)(async () => {
      await onBlurFragment();
      onPressHeaderRight();
    });
    const _onPressMediaMessage = (0, _uikitUtils.useFreshCallback)(async (message, deleteMessage, uri) => {
      await onBlurFragment();
      onPressMediaMessage(message, deleteMessage, uri);
    });
    (0, _react.useEffect)(() => {
      return () => {
        onBlurFragment();
      };
    }, []);
    const renderItem = (0, _uikitUtils.useFreshCallback)(props => {
      const content = renderMessage ? renderMessage(props) : /*#__PURE__*/_react.default.createElement(_GroupChannelMessageRenderer.default, props);
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, null, content, props.isFirstItem && !hasNext() && /*#__PURE__*/_react.default.createElement(_GroupChannelMessageRenderer.GroupChannelTypingIndicatorBubble, null));
    });
    const memoizedFlatListProps = (0, _react.useMemo)(() => ({
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(GroupChannelModule.StatusEmpty, null),
      contentContainerStyle: {
        flexGrow: 1
      },
      ...flatListProps
    }), [flatListProps]);
    const onResetMessageList = (0, _react.useCallback)(async () => {
      return await resetWithStartingPoint(Number.MAX_SAFE_INTEGER);
    }, []);
    const onResetMessageListWithStartingPoint = (0, _react.useCallback)(async startingPoint => {
      return await resetWithStartingPoint(startingPoint);
    }, []);

    // Changing the search item will trigger the focus animation on messages.
    const onUpdateSearchItem = (0, _react.useCallback)(searchItem => {
      // Clean up for animation trigger with useEffect
      setInternalSearchItem(undefined);
      setInternalSearchItem(searchItem);
    }, []);
    const onPending = message => {
      groupChannelPubSub.publish({
        type: 'MESSAGE_SENT_PENDING',
        data: {
          message
        }
      });
    };
    const onSent = message => {
      groupChannelPubSub.publish({
        type: 'MESSAGE_SENT_SUCCESS',
        data: {
          message
        }
      });
    };
    const onPressSendUserMessage = (0, _uikitUtils.useFreshCallback)(async params => {
      const processedParams = await onBeforeSendUserMessage(params);
      const message = await sendUserMessage(processedParams, onPending);
      onSent(message);
    });
    const onPressSendFileMessage = (0, _uikitUtils.useFreshCallback)(async params => {
      const processedParams = await onBeforeSendFileMessage(params);
      const message = await sendFileMessage(processedParams, onPending);
      onSent(message);
    });
    const onPressUpdateUserMessage = (0, _uikitUtils.useFreshCallback)(async (message, params) => {
      const processedParams = await onBeforeUpdateUserMessage(params);
      await updateUserMessage(message.messageId, processedParams);
    });
    const onPressUpdateFileMessage = (0, _uikitUtils.useFreshCallback)(async (message, params) => {
      const processedParams = await onBeforeUpdateFileMessage(params);
      await updateFileMessage(message.messageId, processedParams);
    });
    const onScrolledAwayFromBottom = (0, _uikitUtils.useFreshCallback)(value => {
      if (!value) resetNewMessages();
      setScrolledAwayFromBottom(value);
    });
    return /*#__PURE__*/_react.default.createElement(GroupChannelModule.Provider, {
      channel: channel,
      groupChannelPubSub: groupChannelPubSub,
      enableTypingIndicator: enableTypingIndicator ?? sbOptions.uikit.groupChannel.channel.enableTypingIndicator,
      keyboardAvoidOffset: keyboardAvoidOffset,
      messages: messages,
      onUpdateSearchItem: onUpdateSearchItem
    }, /*#__PURE__*/_react.default.createElement(GroupChannelModule.Header, {
      shouldHideRight: navigateFromMessageSearch,
      onPressHeaderLeft: _onPressHeaderLeft,
      onPressHeaderRight: _onPressHeaderRight
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(GroupChannelModule.StatusLoading, null)
    }, /*#__PURE__*/_react.default.createElement(GroupChannelModule.MessageList, {
      channel: channel,
      searchItem: internalSearchItem,
      onResetMessageList: onResetMessageList,
      onResetMessageListWithStartingPoint: onResetMessageListWithStartingPoint,
      onUpdateSearchItem: onUpdateSearchItem,
      enableMessageGrouping: enableMessageGrouping,
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId,
      renderMessage: renderItem,
      messages: messages,
      newMessages: newMessages,
      onTopReached: loadPrevious,
      onBottomReached: loadNext,
      hasNext: hasNext,
      scrolledAwayFromBottom: scrolledAwayFromBottom,
      onScrolledAwayFromBottom: onScrolledAwayFromBottom,
      renderNewMessagesButton: renderNewMessagesButton,
      renderScrollToBottomButton: renderScrollToBottomButton,
      onResendFailedMessage: resendMessage,
      onDeleteMessage: deleteMessage,
      onPressMediaMessage: _onPressMediaMessage,
      flatListProps: memoizedFlatListProps
    }), /*#__PURE__*/_react.default.createElement(GroupChannelModule.Input, {
      SuggestedMentionList: GroupChannelModule.SuggestedMentionList,
      shouldRenderInput: shouldRenderInput(channel),
      onPressSendUserMessage: onPressSendUserMessage,
      onPressSendFileMessage: onPressSendFileMessage,
      onPressUpdateUserMessage: onPressUpdateUserMessage,
      onPressUpdateFileMessage: onPressUpdateFileMessage
    })));
  };
};
function shouldRenderInput(channel) {
  if (channel.isBroadcast) {
    return channel.myRole === 'operator';
  }
  return true;
}
function getCollectionCreator(channel, messageListQueryParams, deprecatedCreatorProp) {
  if (!messageListQueryParams && deprecatedCreatorProp) return deprecatedCreatorProp;
  return defaultParams => {
    const params = {
      ...defaultParams,
      ...messageListQueryParams
    };
    return channel.createMessageCollection({
      ...params,
      filter: new _groupChannel.MessageFilter(params)
    });
  };
}
var _default = createGroupChannelFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelFragment.js.map