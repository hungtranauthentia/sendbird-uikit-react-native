import React, { useMemo, useState } from 'react';
import { SendbirdError } from '@sendbird/chat';
import { useOpenChannelMessages } from '@sendbird/uikit-chat-hooks';
import { useToast } from '@sendbird/uikit-react-native-foundation';
import { NOOP, PASS, SBErrorCode, messageComparator, useFreshCallback } from '@sendbird/uikit-utils';
import OpenChannelMessageRenderer from '../components/OpenChannelMessageRenderer';
import ScrollToBottomButton from '../components/ScrollToBottomButton';
import StatusComposition from '../components/StatusComposition';
import { UNKNOWN_USER_ID } from '../constants';
import { createOpenChannelModule } from '../domain/openChannel';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
import pubsub from '../utils/pubsub';
const createOpenChannelFragment = initModule => {
  const OpenChannelModule = createOpenChannelModule(initModule);
  return _ref => {
    let {
      channel,
      onChannelDeleted = NOOP,
      onPressHeaderLeft = NOOP,
      onPressHeaderRightWithSettings = NOOP,
      onPressHeaderRightWithParticipants = NOOP,
      onBeforeSendUserMessage = PASS,
      onBeforeSendFileMessage = PASS,
      onBeforeUpdateUserMessage = PASS,
      onBeforeUpdateFileMessage = PASS,
      onPressMediaMessage = NOOP,
      renderMessage,
      renderNewMessagesButton = () => null,
      renderScrollToBottomButton = props => /*#__PURE__*/React.createElement(ScrollToBottomButton, props),
      enableMessageGrouping = true,
      keyboardAvoidOffset,
      flatListProps,
      queryCreator,
      sortComparator = messageComparator
    } = _ref;
    const {
      sdk,
      currentUser
    } = useSendbirdChat();
    const {
      STRINGS
    } = useLocalization();
    const {
      show: showToast
    } = useToast();
    const [openChannelPubSub] = useState(() => pubsub());
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
    } = useOpenChannelMessages(sdk, channel, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId, {
      queryCreator,
      sortComparator,
      onChannelDeleted,
      onError(error) {
        if (error instanceof SendbirdError) {
          switch (error.code) {
            case SBErrorCode.RESOURCE_NOT_FOUND:
            case SBErrorCode.CHANNEL_NOT_FOUND:
            case SBErrorCode.BANNED_USER_SEND_MESSAGE_NOT_ALLOWED:
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
    const isOperator = channel.isOperator((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? UNKNOWN_USER_ID);
    const _renderMessage = useFreshCallback(props => {
      if (renderMessage) return renderMessage(props);
      return /*#__PURE__*/React.createElement(OpenChannelMessageRenderer, props);
    });
    const memoizedFlatListProps = useMemo(() => ({
      ListEmptyComponent: /*#__PURE__*/React.createElement(OpenChannelModule.StatusEmpty, null),
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
    const onPressSendUserMessage = useFreshCallback(async params => {
      const processedParams = await onBeforeSendUserMessage(params);
      const message = await sendUserMessage(processedParams, onPending);
      onSent(message);
    });
    const onPressSendFileMessage = useFreshCallback(async params => {
      const processedParams = await onBeforeSendFileMessage(params);
      const message = await sendFileMessage(processedParams, onPending);
      onSent(message);
    });
    const onPressUpdateUserMessage = useFreshCallback(async (message, params) => {
      const processedParams = await onBeforeUpdateUserMessage(params);
      await updateUserMessage(message.messageId, processedParams);
    });
    const onPressUpdateFileMessage = useFreshCallback(async (message, params) => {
      const processedParams = await onBeforeUpdateFileMessage(params);
      await updateFileMessage(message.messageId, processedParams);
    });
    return /*#__PURE__*/React.createElement(OpenChannelModule.Provider, {
      openChannelPubSub: openChannelPubSub,
      channel: channel,
      keyboardAvoidOffset: keyboardAvoidOffset
    }, /*#__PURE__*/React.createElement(OpenChannelModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      rightIconName: isOperator ? 'info' : 'members',
      onPressHeaderRight: isOperator ? onPressHeaderRightWithSettings : onPressHeaderRightWithParticipants
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(OpenChannelModule.StatusLoading, null)
    }, /*#__PURE__*/React.createElement(OpenChannelModule.MessageList, {
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
      onScrolledAwayFromBottom: NOOP,
      renderNewMessagesButton: renderNewMessagesButton,
      renderScrollToBottomButton: renderScrollToBottomButton,
      onResendFailedMessage: resendMessage,
      onDeleteMessage: deleteMessage,
      onPressMediaMessage: onPressMediaMessage,
      flatListProps: memoizedFlatListProps
    }), /*#__PURE__*/React.createElement(OpenChannelModule.Input, {
      shouldRenderInput: true,
      onPressSendUserMessage: onPressSendUserMessage,
      onPressSendFileMessage: onPressSendFileMessage,
      onPressUpdateUserMessage: onPressUpdateUserMessage,
      onPressUpdateFileMessage: onPressUpdateFileMessage
    })));
  };
};
export default createOpenChannelFragment;
//# sourceMappingURL=createOpenChannelFragment.js.map