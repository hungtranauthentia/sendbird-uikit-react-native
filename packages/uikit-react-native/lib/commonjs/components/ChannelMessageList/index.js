"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _SBUUtils = _interopRequireDefault(require("../../libs/SBUUtils"));
var _ChatFlatList = _interopRequireDefault(require("../ChatFlatList"));
var _ReactionAddons = require("../ReactionAddons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    show
  } = (0, _useContext.useUserProfile)();
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
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
  const renderItem = (0, _uikitUtils.useFreshCallback)(_ref2 => {
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      flex: 1,
      backgroundColor: colors.background
    }, safeAreaLayout]
  }, channel.isFrozen && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ChannelFrozenBanner, {
    style: styles.frozenBanner,
    text: STRINGS.LABELS.CHANNEL_MESSAGE_LIST_FROZEN
  }), /*#__PURE__*/_react.default.createElement(_ChatFlatList.default, _extends({}, flatListProps, {
    onTopReached: onTopReached,
    onBottomReached: onBottomReached,
    onScrolledAwayFromBottom: onScrolledAwayFromBottom,
    ref: ref,
    data: messages,
    renderItem: renderItem,
    keyExtractor: _uikitUtils.messageKeyExtractor,
    contentContainerStyle: [
    // { minHeight: '100%', justifyContent: 'flex-end' },
    channel.isFrozen && styles.frozenListPadding, flatListProps === null || flatListProps === void 0 ? void 0 : flatListProps.contentContainerStyle]
  })), renderNewMessagesButton && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.newMsgButton, safeAreaLayout]
  }, renderNewMessagesButton({
    visible: newMessages.length > 0 && (hasNext() || scrolledAwayFromBottom),
    onPress: () => onPressNewMessagesButton(),
    newMessages
  })), renderScrollToBottomButton && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    openSheet
  } = (0, _uikitReactNativeFoundation.useBottomSheet)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const {
    clipboardService,
    fileService
  } = (0, _useContext.usePlatformService)();
  const {
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const onResendFailure = error => {
    toast.show(STRINGS.TOAST.RESEND_MSG_ERROR, 'error');
    _uikitUtils.Logger.error(STRINGS.TOAST.RESEND_MSG_ERROR, error);
  };
  const onDeleteFailure = error => {
    toast.show(STRINGS.TOAST.DELETE_MSG_ERROR, 'error');
    _uikitUtils.Logger.error(STRINGS.TOAST.DELETE_MSG_ERROR, error);
  };
  const onCopyText = message => {
    if (message.isUserMessage()) {
      clipboardService.setString(message.message || '');
      toast.show(STRINGS.TOAST.COPY_OK, 'success');
    }
  };
  const onDownloadFile = message => {
    if (message.isFileMessage()) {
      if ((0, _uikitUtils.toMegabyte)(message.size) > 4) {
        toast.show(STRINGS.TOAST.DOWNLOAD_START, 'success');
      }
      fileService.save({
        fileUrl: message.url,
        fileName: message.name,
        fileType: message.type
      }).then(response => {
        toast.show(STRINGS.TOAST.DOWNLOAD_OK, 'success');
        _uikitUtils.Logger.log('File saved to', response);
      }).catch(err => {
        toast.show(STRINGS.TOAST.DOWNLOAD_ERROR, 'error');
        _uikitUtils.Logger.log('File save failure', err);
      });
    }
  };
  const onOpenFile = message => {
    if (message.isFileMessage()) {
      const fileType = (0, _uikitUtils.getFileType)(message.type || (0, _uikitUtils.getFileExtension)(message.name));
      if (['image', 'video', 'audio'].includes(fileType)) {
        onPressMediaMessage === null || onPressMediaMessage === void 0 ? void 0 : onPressMediaMessage(message, () => onDeleteMessage(message), (0, _uikitUtils.getAvailableUriFromFileMessage)(message));
      } else {
        _SBUUtils.default.openURL(message.url);
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
        if ((0, _uikitUtils.isMyMessage)(message, currentUserId) && message.sendingStatus === 'succeeded') {
          sheetItems.push(menu.edit(message));
          sheetItems.push(menu.delete(message));
        }
        if (channel.isGroupChannel() && sbOptions.uikit.groupChannel.channel.replyType === 'quote_reply') {
          sheetItems.push(menu.reply(message));
        }
      }
    }
    if (message.isFileMessage()) {
      if (!(0, _uikitUtils.isVoiceMessage)(message)) {
        sheetItems.push(menu.download(message));
      }
      if (!channel.isEphemeral) {
        if ((0, _uikitUtils.isMyMessage)(message, currentUserId) && message.sendingStatus === 'succeeded') {
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
      HeaderComponent: (0, _uikitUtils.shouldRenderReaction)(channel, channel.isGroupChannel() && (channel.isSuper ? configs.enableReactionsSupergroup : configs.enableReactions)) ? _ref5 => {
        let {
          onClose
        } = _ref5;
        return /*#__PURE__*/_react.default.createElement(_ReactionAddons.ReactionAddons.BottomSheet, {
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
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
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
var _default = /*#__PURE__*/_react.default.forwardRef(ChannelMessageList);
exports.default = _default;
//# sourceMappingURL=index.js.map