function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChannelFrozenBanner, createStyleSheet, useAlert, useBottomSheet, useToast, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { Logger, getAvailableUriFromFileMessage, getFileExtension, getFileType, isMyMessage, isVoiceMessage, messageKeyExtractor, shouldRenderReaction, toMegabyte, useFreshCallback } from '@sendbird/uikit-utils';
import { useLocalization, usePlatformService, useSendbirdChat, useUserProfile } from '../../hooks/useContext';
import SBUUtils from '../../libs/SBUUtils';
import ChatFlatList from '../ChatFlatList';
import { ReactionAddons } from '../ReactionAddons';
const ChannelMessageList = (_ref, ref) => {
  let {
    searchItem,
    hasNext,
    channel,
    onEditMessage,
    onReplyMessage,
    onDeleteMessage,
    onResendFailedMessage,
    onPressMediaMessage,
    onPressParentMessage,
    currentUserId,
    renderNewMessagesButton,
    renderScrollToBottomButton,
    renderMessage,
    messages,
    newMessages,
    enableMessageGrouping,
    onScrolledAwayFromBottom,
    scrolledAwayFromBottom,
    onBottomReached,
    onTopReached,
    flatListProps,
    onPressNewMessagesButton,
    onPressScrollToBottomButton
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const {
    show
  } = useUserProfile();
  const {
    left,
    right
  } = useSafeAreaInsets();
  const createMessagePressActions = useCreateMessagePressActions({
    channel,
    currentUserId,
    onEditMessage,
    onReplyMessage,
    onDeleteMessage,
    onResendFailedMessage,
    onPressMediaMessage
  });
  const safeAreaLayout = {
    paddingLeft: left,
    paddingRight: right
  };
  const renderItem = useFreshCallback(_ref2 => {
    let {
      item,
      index
    } = _ref2;
    const {
      onPress,
      onLongPress,
      bottomSheetItem
    } = createMessagePressActions({
      message: item
    });
    return renderMessage({
      message: item,
      prevMessage: messages[index + 1],
      nextMessage: messages[index - 1],
      onPress,
      onLongPress,
      onPressParentMessage,
      onShowUserProfile: show,
      enableMessageGrouping,
      channel,
      currentUserId,
      focused: ((searchItem === null || searchItem === void 0 ? void 0 : searchItem.startingPoint) ?? -1) === item.createdAt,
      bottomSheetItem,
      isFirstItem: index === 0
    });
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flex: 1,
      backgroundColor: colors.background
    }, safeAreaLayout]
  }, channel.isFrozen && /*#__PURE__*/React.createElement(ChannelFrozenBanner, {
    style: styles.frozenBanner,
    text: STRINGS.LABELS.CHANNEL_MESSAGE_LIST_FROZEN
  }), /*#__PURE__*/React.createElement(ChatFlatList, _extends({}, flatListProps, {
    onTopReached: onTopReached,
    onBottomReached: onBottomReached,
    onScrolledAwayFromBottom: onScrolledAwayFromBottom,
    ref: ref,
    data: messages,
    renderItem: renderItem,
    keyExtractor: messageKeyExtractor,
    contentContainerStyle: [
    // { minHeight: '100%', justifyContent: 'flex-end' },
    channel.isFrozen && styles.frozenListPadding, flatListProps === null || flatListProps === void 0 ? void 0 : flatListProps.contentContainerStyle]
  })), renderNewMessagesButton && /*#__PURE__*/React.createElement(View, {
    style: [styles.newMsgButton, safeAreaLayout]
  }, renderNewMessagesButton({
    visible: newMessages.length > 0 && (hasNext() || scrolledAwayFromBottom),
    onPress: () => onPressNewMessagesButton(),
    newMessages
  })), renderScrollToBottomButton && /*#__PURE__*/React.createElement(View, {
    style: [styles.scrollButton, safeAreaLayout]
  }, renderScrollToBottomButton({
    visible: hasNext() || scrolledAwayFromBottom,
    onPress: () => onPressScrollToBottomButton()
  })));
};
const useCreateMessagePressActions = _ref3 => {
  let {
    channel,
    currentUserId,
    onResendFailedMessage,
    onEditMessage,
    onReplyMessage,
    onDeleteMessage,
    onPressMediaMessage
  } = _ref3;
  const {
    colors
  } = useUIKitTheme();
  const {
    STRINGS
  } = useLocalization();
  const toast = useToast();
  const {
    openSheet
  } = useBottomSheet();
  const {
    alert
  } = useAlert();
  const {
    clipboardService,
    fileService
  } = usePlatformService();
  const {
    sbOptions
  } = useSendbirdChat();
  const onResendFailure = error => {
    toast.show(STRINGS.TOAST.RESEND_MSG_ERROR, 'error');
    Logger.error(STRINGS.TOAST.RESEND_MSG_ERROR, error);
  };
  const onDeleteFailure = error => {
    toast.show(STRINGS.TOAST.DELETE_MSG_ERROR, 'error');
    Logger.error(STRINGS.TOAST.DELETE_MSG_ERROR, error);
  };
  const onCopyText = message => {
    if (message.isUserMessage()) {
      clipboardService.setString(message.message || '');
      toast.show(STRINGS.TOAST.COPY_OK, 'success');
    }
  };
  const onDownloadFile = message => {
    if (message.isFileMessage()) {
      if (toMegabyte(message.size) > 4) {
        toast.show(STRINGS.TOAST.DOWNLOAD_START, 'success');
      }
      fileService.save({
        fileUrl: message.url,
        fileName: message.name,
        fileType: message.type
      }).then(response => {
        toast.show(STRINGS.TOAST.DOWNLOAD_OK, 'success');
        Logger.log('File saved to', response);
      }).catch(err => {
        toast.show(STRINGS.TOAST.DOWNLOAD_ERROR, 'error');
        Logger.log('File save failure', err);
      });
    }
  };
  const onOpenFile = message => {
    if (message.isFileMessage()) {
      const fileType = getFileType(message.type || getFileExtension(message.name));
      if (['image', 'video', 'audio'].includes(fileType)) {
        onPressMediaMessage === null || onPressMediaMessage === void 0 ? void 0 : onPressMediaMessage(message, () => onDeleteMessage(message), getAvailableUriFromFileMessage(message));
      } else {
        SBUUtils.openURL(message.url);
      }
    }
  };
  const openSheetForFailedMessage = message => {
    openSheet({
      sheetItems: [{
        title: STRINGS.LABELS.CHANNEL_MESSAGE_FAILED_RETRY,
        onPress: () => onResendFailedMessage(message).catch(onResendFailure)
      }, {
        title: STRINGS.LABELS.CHANNEL_MESSAGE_FAILED_REMOVE,
        titleColor: colors.ui.dialog.default.none.destructive,
        onPress: () => alertForMessageDelete(message)
      }]
    });
  };
  const alertForMessageDelete = message => {
    alert({
      title: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_TITLE,
      buttons: [{
        text: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_CANCEL
      }, {
        text: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_OK,
        style: 'destructive',
        onPress: () => {
          onDeleteMessage(message).catch(onDeleteFailure);
        }
      }]
    });
  };
  return _ref4 => {
    let {
      message
    } = _ref4;
    if (!message.isUserMessage() && !message.isFileMessage()) return {};
    const sheetItems = [];
    const menu = {
      copy: message => ({
        icon: 'copy',
        title: STRINGS.LABELS.CHANNEL_MESSAGE_COPY,
        onPress: () => onCopyText(message)
      }),
      edit: message => ({
        icon: 'edit',
        title: STRINGS.LABELS.CHANNEL_MESSAGE_EDIT,
        onPress: () => onEditMessage(message)
      }),
      delete: message => ({
        disabled: message.threadInfo ? message.threadInfo.replyCount > 0 : undefined,
        icon: 'delete',
        title: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE,
        onPress: () => alertForMessageDelete(message)
      }),
      reply: message => ({
        disabled: Boolean(message.parentMessageId),
        icon: 'reply',
        title: STRINGS.LABELS.CHANNEL_MESSAGE_REPLY,
        onPress: () => onReplyMessage === null || onReplyMessage === void 0 ? void 0 : onReplyMessage(message)
      }),
      download: message => ({
        icon: 'download',
        title: STRINGS.LABELS.CHANNEL_MESSAGE_SAVE,
        onPress: () => onDownloadFile(message)
      })
    };
    if (message.isUserMessage()) {
      sheetItems.push(menu.copy(message));
      if (!channel.isEphemeral) {
        if (isMyMessage(message, currentUserId) && message.sendingStatus === 'succeeded') {
          sheetItems.push(menu.edit(message));
          sheetItems.push(menu.delete(message));
        }
        if (channel.isGroupChannel() && sbOptions.uikit.groupChannel.channel.replyType === 'quote_reply') {
          sheetItems.push(menu.reply(message));
        }
      }
    }
    if (message.isFileMessage()) {
      if (!isVoiceMessage(message)) {
        sheetItems.push(menu.download(message));
      }
      if (!channel.isEphemeral) {
        if (isMyMessage(message, currentUserId) && message.sendingStatus === 'succeeded') {
          sheetItems.push(menu.delete(message));
        }
        if (channel.isGroupChannel() && sbOptions.uikit.groupChannel.channel.replyType === 'quote_reply') {
          sheetItems.push(menu.reply(message));
        }
      }
    }
    const configs = sbOptions.uikitWithAppInfo.groupChannel.channel;
    const bottomSheetItem = {
      sheetItems,
      HeaderComponent: shouldRenderReaction(channel, channel.isGroupChannel() && (channel.isSuper ? configs.enableReactionsSupergroup : configs.enableReactions)) ? _ref5 => {
        let {
          onClose
        } = _ref5;
        return /*#__PURE__*/React.createElement(ReactionAddons.BottomSheet, {
          message: message,
          channel: channel,
          onClose: onClose
        });
      } : undefined
    };
    switch (true) {
      case message.sendingStatus === 'pending':
        {
          return {
            onPress: undefined,
            onLongPress: undefined,
            bottomSheetItem: undefined
          };
        }
      case message.sendingStatus === 'failed':
        {
          return {
            onPress: () => onResendFailedMessage(message).catch(onResendFailure),
            onLongPress: () => openSheetForFailedMessage(message),
            bottomSheetItem
          };
        }
      case message.isFileMessage():
        {
          return {
            onPress: () => onOpenFile(message),
            onLongPress: () => openSheet(bottomSheetItem),
            bottomSheetItem
          };
        }
      default:
        {
          return {
            onPress: undefined,
            onLongPress: () => openSheet(bottomSheetItem),
            bottomSheetItem
          };
        }
    }
  };
};
const styles = createStyleSheet({
  frozenBanner: {
    position: 'absolute',
    zIndex: 999,
    top: 8,
    left: 8,
    right: 8
  },
  frozenListPadding: {
    paddingBottom: 32
  },
  newMsgButton: {
    position: 'absolute',
    zIndex: 999,
    bottom: 10,
    alignSelf: 'center'
  },
  scrollButton: {
    position: 'absolute',
    zIndex: 998,
    bottom: 10,
    right: 16
  }
});

// NOTE: Due to Generic inference is not working on forwardRef, we need to cast it as typeof ChannelMessageList and implicit `ref` prop
export default /*#__PURE__*/React.forwardRef(ChannelMessageList);
//# sourceMappingURL=index.js.map