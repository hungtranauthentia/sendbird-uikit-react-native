import React, { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MentionType, MessageMetaArray } from '@sendbird/chat/message';
import { Icon, Modal, TextInput, createStyleSheet, useAlert, useBottomSheet, useToast, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { Logger, useDeferredModalState, useIIFE } from '@sendbird/uikit-utils';
import { VOICE_MESSAGE_META_ARRAY_DURATION_KEY, VOICE_MESSAGE_META_ARRAY_MESSAGE_TYPE_KEY } from '../../constants';
import { useChannelInputItems } from '../../hooks/useChannelInputItems';
import { useLocalization, usePlatformService, useSendbirdChat } from '../../hooks/useContext';
import SBUUtils from '../../libs/SBUUtils';
const SendInput = /*#__PURE__*/forwardRef(function SendInput(_ref, ref) {
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
  } = usePlatformService();
  const {
    mentionManager,
    sbOptions
  } = useSendbirdChat();
  const {
    STRINGS
  } = useLocalization();
  const {
    openSheet
  } = useBottomSheet();
  const toast = useToast();
  const {
    onClose,
    onDismiss,
    visible: voiceMessageInputVisible,
    setVisible: setVoiceMessageInputVisible
  } = useDeferredModalState();
  const messageReplyParams = useIIFE(() => {
    const {
      groupChannel
    } = sbOptions.uikit;
    if (!channel.isGroupChannel() || groupChannel.channel.replyType === 'none' || !messageToReply) return {};
    return {
      parentMessageId: messageToReply.messageId,
      isReplyToChannel: true
    };
  });
  const messageMentionParams = useIIFE(() => {
    const {
      groupChannel
    } = sbOptions.uikit;
    if (!channel.isGroupChannel() || !groupChannel.channel.enableMention) return {};
    return {
      mentionType: MentionType.USERS,
      mentionedUserIds: mentionedUsers.map(it => it.user.userId),
      mentionedMessageTemplate: mentionManager.textToMentionedMessageTemplate(text, mentionedUsers, groupChannel.channel.enableMention)
    };
  });
  const onFailureToSend = error => {
    toast.show(STRINGS.TOAST.SEND_MSG_ERROR, 'error');
    Logger.error(STRINGS.TOAST.SEND_MSG_ERROR, error);
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
      Logger.error(STRINGS.TOAST.USER_MUTED_ERROR);
    } else if (inputFrozen) {
      toast.show(STRINGS.TOAST.CHANNEL_FROZEN_ERROR, 'error');
      Logger.error(STRINGS.TOAST.CHANNEL_FROZEN_ERROR);
    } else {
      onPressSendFileMessage({
        file,
        metaArrays: [new MessageMetaArray({
          key: VOICE_MESSAGE_META_ARRAY_DURATION_KEY,
          value: [String(durationMills)]
        }), new MessageMetaArray({
          key: VOICE_MESSAGE_META_ARRAY_MESSAGE_TYPE_KEY,
          value: [`voice/${recorderService.options.extension}`]
        })],
        ...messageReplyParams
      }).catch(onFailureToSend);
    }
    onChangeText('');
    setMessageToReply === null || setMessageToReply === void 0 ? void 0 : setMessageToReply();
  };
  const sheetItems = useChannelInputItems(channel, sendFileMessage);
  const getPlaceholder = () => {
    if (inputMuted) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_MUTED;
    if (inputFrozen) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_DISABLED;
    if (inputDisabled) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_DISABLED;
    if (messageToReply) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_REPLY;
    return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_ACTIVE;
  };
  const voiceMessageEnabled = channel.isGroupChannel() && sbOptions.uikit.groupChannel.channel.enableVoiceMessage;
  const sendButtonVisible = Boolean(text.trim());
  return /*#__PURE__*/React.createElement(View, null, MessageToReplyPreview && /*#__PURE__*/React.createElement(MessageToReplyPreview, {
    messageToReply: messageToReply,
    setMessageToReply: setMessageToReply
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.sendInputContainer
  }, AttachmentsButton && /*#__PURE__*/React.createElement(AttachmentsButton, {
    onPress: () => openSheet({
      sheetItems
    }),
    disabled: inputDisabled
  }), /*#__PURE__*/React.createElement(TextInput, {
    ref: ref,
    multiline: true,
    disableFullscreenUI: true,
    onSelectionChange: onSelectionChange,
    editable: !inputDisabled,
    onChangeText: onChangeText,
    style: style,
    placeholder: getPlaceholder()
  }, mentionManager.textToMentionedComponents(text, mentionedUsers, sbOptions.uikit.groupChannel.channel.enableMention)), voiceMessageEnabled && /*#__PURE__*/React.createElement(VoiceMessageButton, {
    visible: !sendButtonVisible,
    disabled: inputDisabled,
    onPress: () => setVoiceMessageInputVisible(true)
  }), /*#__PURE__*/React.createElement(UserMessageSendButton, {
    visible: sendButtonVisible,
    disabled: inputDisabled,
    onPress: sendUserMessage
  }), voiceMessageEnabled && VoiceMessageInput && /*#__PURE__*/React.createElement(Modal, {
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
  }, /*#__PURE__*/React.createElement(VoiceMessageInput, {
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
  } = useLocalization();
  const {
    alert
  } = useAlert();
  const {
    playerService,
    recorderService
  } = usePlatformService();
  const {
    colors
  } = useUIKitTheme();
  if (!visible) return null;
  const onPressWithPermissionCheck = async () => {
    const recorderGranted = await recorderService.requestPermission();
    if (!recorderGranted) {
      alert({
        title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
        message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_MICROPHONE, STRINGS.LABELS.PERMISSION_APP_NAME),
        buttons: [{
          text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
          onPress: () => SBUUtils.openSettings()
        }]
      });
      Logger.error('Failed to request permission for recorder');
      return;
    }
    const playerGranted = await playerService.requestPermission();
    if (!playerGranted) {
      alert({
        title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
        message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_DEVICE_STORAGE, STRINGS.LABELS.PERMISSION_APP_NAME),
        buttons: [{
          text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
          onPress: () => SBUUtils.openSettings()
        }]
      });
      Logger.error('Failed to request permission for player');
      return;
    }
    onPress();
  };
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPressWithPermissionCheck,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon, {
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
  } = useUIKitTheme();
  if (!visible) return null;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon, {
    color: disabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'send',
    size: 24,
    containerStyle: styles.sendIcon
  }));
};
const styles = createStyleSheet({
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
export default SendInput;
//# sourceMappingURL=SendInput.js.map