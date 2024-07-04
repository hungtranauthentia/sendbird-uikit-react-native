"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _message = require("@sendbird/chat/message");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _constants = require("../../constants");
var _useChannelInputItems = require("../../hooks/useChannelInputItems");
var _useContext = require("../../hooks/useContext");
var _SBUUtils = _interopRequireDefault(require("../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SendInput = /*#__PURE__*/(0, _react.forwardRef)(function SendInput(_ref, ref) {
  let {
    style,
    VoiceMessageInput,
    MessageToReplyPreview,
    AttachmentsButton,
    onPressSendUserMessage,
    onPressSendFileMessage,
    text,
    onChangeText,
    onSelectionChange,
    mentionedUsers,
    inputDisabled,
    inputFrozen,
    inputMuted,
    channel,
    messageToReply,
    setMessageToReply
  } = _ref;
  const {
    playerService,
    recorderService
  } = (0, _useContext.usePlatformService)();
  const {
    mentionManager,
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    openSheet
  } = (0, _uikitReactNativeFoundation.useBottomSheet)();
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    onClose,
    onDismiss,
    visible: voiceMessageInputVisible,
    setVisible: setVoiceMessageInputVisible
  } = (0, _uikitUtils.useDeferredModalState)();
  const messageReplyParams = (0, _uikitUtils.useIIFE)(() => {
    const {
      groupChannel
    } = sbOptions.uikit;
    if (!channel.isGroupChannel() || groupChannel.channel.replyType === 'none' || !messageToReply) return {};
    return {
      parentMessageId: messageToReply.messageId,
      isReplyToChannel: true
    };
  });
  const messageMentionParams = (0, _uikitUtils.useIIFE)(() => {
    const {
      groupChannel
    } = sbOptions.uikit;
    if (!channel.isGroupChannel() || !groupChannel.channel.enableMention) return {};
    return {
      mentionType: _message.MentionType.USERS,
      mentionedUserIds: mentionedUsers.map(it => it.user.userId),
      mentionedMessageTemplate: mentionManager.textToMentionedMessageTemplate(text, mentionedUsers, groupChannel.channel.enableMention)
    };
  });
  const onFailureToSend = error => {
    toast.show(STRINGS.TOAST.SEND_MSG_ERROR, 'error');
    _uikitUtils.Logger.error(STRINGS.TOAST.SEND_MSG_ERROR, error);
  };
  const sendUserMessage = () => {
    onPressSendUserMessage({
      message: text,
      ...messageMentionParams,
      ...messageReplyParams
    }).catch(onFailureToSend);
    onChangeText('');
    setMessageToReply === null || setMessageToReply === void 0 ? void 0 : setMessageToReply();
  };
  const sendFileMessage = file => {
    onPressSendFileMessage({
      file,
      ...messageReplyParams
    }).catch(onFailureToSend);
    setMessageToReply === null || setMessageToReply === void 0 ? void 0 : setMessageToReply();
  };
  const sendVoiceMessage = (file, durationMills) => {
    if (inputMuted) {
      toast.show(STRINGS.TOAST.USER_MUTED_ERROR, 'error');
      _uikitUtils.Logger.error(STRINGS.TOAST.USER_MUTED_ERROR);
    } else if (inputFrozen) {
      toast.show(STRINGS.TOAST.CHANNEL_FROZEN_ERROR, 'error');
      _uikitUtils.Logger.error(STRINGS.TOAST.CHANNEL_FROZEN_ERROR);
    } else {
      onPressSendFileMessage({
        file,
        metaArrays: [new _message.MessageMetaArray({
          key: _constants.VOICE_MESSAGE_META_ARRAY_DURATION_KEY,
          value: [String(durationMills)]
        }), new _message.MessageMetaArray({
          key: _constants.VOICE_MESSAGE_META_ARRAY_MESSAGE_TYPE_KEY,
          value: [`voice/${recorderService.options.extension}`]
        })],
        ...messageReplyParams
      }).catch(onFailureToSend);
    }
    onChangeText('');
    setMessageToReply === null || setMessageToReply === void 0 ? void 0 : setMessageToReply();
  };
  const sheetItems = (0, _useChannelInputItems.useChannelInputItems)(channel, sendFileMessage);
  const getPlaceholder = () => {
    if (inputMuted) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_MUTED;
    if (inputFrozen) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_DISABLED;
    if (inputDisabled) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_DISABLED;
    if (messageToReply) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_REPLY;
    return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_ACTIVE;
  };
  const voiceMessageEnabled = channel.isGroupChannel() && sbOptions.uikit.groupChannel.channel.enableVoiceMessage;
  const sendButtonVisible = Boolean(text.trim());
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, MessageToReplyPreview && /*#__PURE__*/_react.default.createElement(MessageToReplyPreview, {
    messageToReply: messageToReply,
    setMessageToReply: setMessageToReply
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.sendInputContainer
  }, AttachmentsButton && /*#__PURE__*/_react.default.createElement(AttachmentsButton, {
    onPress: () => openSheet({
      sheetItems
    }),
    disabled: inputDisabled
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.TextInput, {
    ref: ref,
    multiline: true,
    disableFullscreenUI: true,
    onSelectionChange: onSelectionChange,
    editable: !inputDisabled,
    onChangeText: onChangeText,
    style: style,
    placeholder: getPlaceholder()
  }, mentionManager.textToMentionedComponents(text, mentionedUsers, sbOptions.uikit.groupChannel.channel.enableMention)), voiceMessageEnabled && /*#__PURE__*/_react.default.createElement(VoiceMessageButton, {
    visible: !sendButtonVisible,
    disabled: inputDisabled,
    onPress: () => setVoiceMessageInputVisible(true)
  }), /*#__PURE__*/_react.default.createElement(UserMessageSendButton, {
    visible: sendButtonVisible,
    disabled: inputDisabled,
    onPress: sendUserMessage
  }), voiceMessageEnabled && VoiceMessageInput && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Modal, {
    disableBackgroundClose: true,
    onClose: onClose,
    onDismiss: () => {
      onDismiss();
      Promise.allSettled([playerService.reset(), recorderService.reset()]);
    },
    backgroundStyle: {
      justifyContent: 'flex-end'
    },
    visible: voiceMessageInputVisible,
    type: 'slide-no-gesture'
  }, /*#__PURE__*/_react.default.createElement(VoiceMessageInput, {
    onClose: onClose,
    onSend: _ref2 => {
      let {
        file,
        duration
      } = _ref2;
      return sendVoiceMessage(file, duration);
    }
  }))));
});
const VoiceMessageButton = _ref3 => {
  let {
    visible,
    disabled,
    onPress
  } = _ref3;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const {
    playerService,
    recorderService
  } = (0, _useContext.usePlatformService)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (!visible) return null;
  const onPressWithPermissionCheck = async () => {
    const recorderGranted = await recorderService.requestPermission();
    if (!recorderGranted) {
      alert({
        title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
        message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_MICROPHONE, STRINGS.LABELS.PERMISSION_APP_NAME),
        buttons: [{
          text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
          onPress: () => _SBUUtils.default.openSettings()
        }]
      });
      _uikitUtils.Logger.error('Failed to request permission for recorder');
      return;
    }
    const playerGranted = await playerService.requestPermission();
    if (!playerGranted) {
      alert({
        title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
        message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_DEVICE_STORAGE, STRINGS.LABELS.PERMISSION_APP_NAME),
        buttons: [{
          text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
          onPress: () => _SBUUtils.default.openSettings()
        }]
      });
      _uikitUtils.Logger.error('Failed to request permission for player');
      return;
    }
    onPress();
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressWithPermissionCheck,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: disabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'audio-on',
    size: 24,
    containerStyle: styles.sendIcon
  }));
};
const UserMessageSendButton = _ref4 => {
  let {
    visible,
    disabled,
    onPress
  } = _ref4;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (!visible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: disabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'send',
    size: 24,
    containerStyle: styles.sendIcon
  }));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  sendInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  sendIcon: {
    marginLeft: 4,
    padding: 4
  }
});
var _default = SendInput;
exports.default = _default;
//# sourceMappingURL=SendInput.js.map