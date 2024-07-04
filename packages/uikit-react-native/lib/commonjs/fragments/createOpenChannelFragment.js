"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _chat = require("@sendbird/chat");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _OpenChannelMessageRenderer = _interopRequireDefault(require("../components/OpenChannelMessageRenderer"));
var _ScrollToBottomButton = _interopRequireDefault(require("../components/ScrollToBottomButton"));
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _constants = require("../constants");
var _openChannel = require("../domain/openChannel");
var _useContext = require("../hooks/useContext");
var _pubsub = _interopRequireDefault(require("../utils/pubsub"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const createOpenChannelFragment = initModule => {
  const OpenChannelModule = (0, _openChannel.createOpenChannelModule)(initModule);
  return _ref => {
    let {
      channel,
      onChannelDeleted = _uikitUtils.NOOP,
      onPressHeaderLeft = _uikitUtils.NOOP,
      onPressHeaderRightWithSettings = _uikitUtils.NOOP,
      onPressHeaderRightWithParticipants = _uikitUtils.NOOP,
      onBeforeSendUserMessage = _uikitUtils.PASS,
      onBeforeSendFileMessage = _uikitUtils.PASS,
      onBeforeUpdateUserMessage = _uikitUtils.PASS,
      onBeforeUpdateFileMessage = _uikitUtils.PASS,
      onPressMediaMessage = _uikitUtils.NOOP,
      renderMessage,
      renderNewMessagesButton = () => null,
      renderScrollToBottomButton = props => /*#__PURE__*/_react.default.createElement(_ScrollToBottomButton.default, props),
      enableMessageGrouping = true,
      keyboardAvoidOffset,
      flatListProps,
      queryCreator,
      sortComparator = _uikitUtils.messageComparator
    } = _ref;
    const {
      sdk,
      currentUser
    } = (0, _useContext.useSendbirdChat)();
    const {
      STRINGS
    } = (0, _useContext.useLocalization)();
    const {
      show: showToast
    } = (0, _uikitReactNativeFoundation.useToast)();
    const [openChannelPubSub] = (0, _react.useState)(() => (0, _pubsub.default)());
    const {
      messages,
      newMessages,
      next,
      prev,
      hasNext,
      sendFileMessage,
      sendUserMessage,
      updateFileMessage,
      updateUserMessage,
      resendMessage,
      deleteMessage,
      loading
    } = (0, _uikitChatHooks.useOpenChannelMessages)(sdk, channel, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId, {
      queryCreator,
      sortComparator,
      onChannelDeleted,
      onError(error) {
        if (error instanceof _chat.SendbirdError) {
          switch (error.code) {
            case _uikitUtils.SBErrorCode.RESOURCE_NOT_FOUND:
            case _uikitUtils.SBErrorCode.CHANNEL_NOT_FOUND:
            case _uikitUtils.SBErrorCode.BANNED_USER_SEND_MESSAGE_NOT_ALLOWED:
              {
                return showToast(STRINGS.TOAST.GET_CHANNEL_ERROR, 'error');
              }
          }
        }
        showToast(STRINGS.TOAST.UNKNOWN_ERROR, 'error');
      },
      onMessagesReceived(messages) {
        openChannelPubSub.publish({
          type: 'MESSAGES_RECEIVED',
          data: {
            messages
          }
        });
      }
    });
    const isOperator = channel.isOperator((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? _constants.UNKNOWN_USER_ID);
    const _renderMessage = (0, _uikitUtils.useFreshCallback)(props => {
      if (renderMessage) return renderMessage(props);
      return /*#__PURE__*/_react.default.createElement(_OpenChannelMessageRenderer.default, props);
    });
    const memoizedFlatListProps = (0, _react.useMemo)(() => ({
      ListEmptyComponent: /*#__PURE__*/_react.default.createElement(OpenChannelModule.StatusEmpty, null),
      contentContainerStyle: {
        flexGrow: 1
      },
      ...flatListProps
    }), [loading, flatListProps]);
    const onPending = message => {
      openChannelPubSub.publish({
        type: 'MESSAGE_SENT_PENDING',
        data: {
          message
        }
      });
    };
    const onSent = message => {
      openChannelPubSub.publish({
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
    return /*#__PURE__*/_react.default.createElement(OpenChannelModule.Provider, {
      openChannelPubSub: openChannelPubSub,
      channel: channel,
      keyboardAvoidOffset: keyboardAvoidOffset
    }, /*#__PURE__*/_react.default.createElement(OpenChannelModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      rightIconName: isOperator ? 'info' : 'members',
      onPressHeaderRight: isOperator ? onPressHeaderRightWithSettings : onPressHeaderRightWithParticipants
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(OpenChannelModule.StatusLoading, null)
    }, /*#__PURE__*/_react.default.createElement(OpenChannelModule.MessageList, {
      channel: channel,
      hasNext: hasNext,
      enableMessageGrouping: enableMessageGrouping,
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId,
      renderMessage: _renderMessage,
      messages: messages,
      newMessages: newMessages,
      onTopReached: prev,
      onBottomReached: next,
      scrolledAwayFromBottom: false,
      onScrolledAwayFromBottom: _uikitUtils.NOOP,
      renderNewMessagesButton: renderNewMessagesButton,
      renderScrollToBottomButton: renderScrollToBottomButton,
      onResendFailedMessage: resendMessage,
      onDeleteMessage: deleteMessage,
      onPressMediaMessage: onPressMediaMessage,
      flatListProps: memoizedFlatListProps
    }), /*#__PURE__*/_react.default.createElement(OpenChannelModule.Input, {
      shouldRenderInput: true,
      onPressSendUserMessage: onPressSendUserMessage,
      onPressSendFileMessage: onPressSendFileMessage,
      onPressUpdateUserMessage: onPressUpdateUserMessage,
      onPressUpdateFileMessage: onPressUpdateFileMessage
    })));
  };
};
var _default = createOpenChannelFragment;
exports.default = _default;
//# sourceMappingURL=createOpenChannelFragment.js.map