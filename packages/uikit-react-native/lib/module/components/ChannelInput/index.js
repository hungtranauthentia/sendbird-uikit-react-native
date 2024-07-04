function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { replace, useIIFE } from '@sendbird/uikit-utils';
import { useSendbirdChat } from '../../hooks/useContext';
import useMentionTextInput from '../../hooks/useMentionTextInput';
import AttachmentsButton from './AttachmentsButton';
import EditInput from './EditInput';
import { MessageToReplyPreview } from './MessageToReplyPreview';
import SendInput from './SendInput';
import VoiceMessageInput from './VoiceMessageInput';
const AUTO_FOCUS = Platform.select({
  ios: false,
  android: true,
  default: false
});

// FIXME(iOS): Dynamic style does not work properly when typing the CJK. (https://github.com/facebook/react-native/issues/26107)
//  To workaround temporarily, change the key for re-mount the component.
//  -> This will affect to keyboard blur when add/remove first mentioned user.
const GET_INPUT_KEY = shouldReset => shouldReset ? 'uikit-input-clear' : 'uikit-input';

// TODO: Refactor 'Edit' mode to clearly
const ChannelInput = props => {
  const {
    channel,
    keyboardAvoidOffset,
    messageToEdit,
    setMessageToEdit
  } = props;
  const {
    top,
    left,
    right,
    bottom
  } = useSafeAreaInsets();
  const {
    colors,
    typography
  } = useUIKitTheme();
  const {
    sbOptions,
    mentionManager
  } = useSendbirdChat();
  const {
    selection,
    onSelectionChange,
    textInputRef,
    text,
    onChangeText,
    mentionedUsers
  } = useMentionTextInput({
    messageToEdit
  });
  const inputMode = useIIFE(() => {
    if (messageToEdit && !messageToEdit.isFileMessage()) return 'edit';else return 'send';
  });
  const mentionAvailable = sbOptions.uikit.groupChannel.channel.enableMention && channel.isGroupChannel() && !channel.isBroadcast;
  const inputKeyToRemount = GET_INPUT_KEY(mentionAvailable ? mentionedUsers.length === 0 : false);
  const [inputHeight, setInputHeight] = useState(styles.inputDefault.height);
  const fontStyle = useMemo(() => {
    if (!typography.body3.fontSize) return typography.body3;
    // NOTE: iOS does not support textAlignVertical, so we should adjust lineHeight to center the text in multiline TextInput.
    return {
      ...typography.body3,
      lineHeight: typography.body3.fontSize * 1.275,
      textAlignVertical: 'center'
    };
  }, [typography.body3.fontSize]);
  const textInputStyle = StyleSheet.flatten([styles.input, fontStyle, props.style]);
  useTypingTrigger(text, channel);
  useTextClearOnDisabled(onChangeText, props.inputDisabled);
  useAutoFocusOnEditMode(textInputRef, messageToEdit);
  const onPressToMention = (user, searchStringRange) => {
    const mentionedMessageText = mentionManager.asMentionedMessageText(user, true);
    const range = {
      start: searchStringRange.start,
      end: searchStringRange.start + mentionedMessageText.length - 1
    };
    onChangeText(replace(text, searchStringRange.start, searchStringRange.end, mentionedMessageText), {
      user,
      range
    });
  };
  if (!props.shouldRenderInput) {
    return /*#__PURE__*/React.createElement(SafeAreaBottom, {
      height: bottom
    });
  }
  console.log('KeyboardAvoidingView 2');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    keyboardVerticalOffset: keyboardAvoidOffset,
    behavior: "padding"
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      paddingLeft: left,
      paddingRight: right,
      backgroundColor: colors.background
    }
  }, /*#__PURE__*/React.createElement(View, {
    onLayout: e => setInputHeight(e.nativeEvent.layout.height),
    style: styles.inputContainer
  }, inputMode === 'send' && /*#__PURE__*/React.createElement(SendInput, _extends({}, props, {
    key: inputKeyToRemount,
    ref: textInputRef,
    text: text,
    onChangeText: onChangeText,
    onSelectionChange: onSelectionChange,
    mentionedUsers: mentionedUsers,
    VoiceMessageInput: props.VoiceMessageInput ?? VoiceMessageInput,
    AttachmentsButton: props.AttachmentsButton ?? AttachmentsButton,
    MessageToReplyPreview: props.MessageToReplyPreview ?? MessageToReplyPreview,
    style: textInputStyle
  })), inputMode === 'edit' && messageToEdit && /*#__PURE__*/React.createElement(EditInput, _extends({}, props, {
    key: inputKeyToRemount,
    ref: textInputRef,
    text: text,
    onChangeText: onChangeText,
    autoFocus: AUTO_FOCUS,
    onSelectionChange: onSelectionChange,
    mentionedUsers: mentionedUsers,
    messageToEdit: messageToEdit,
    setMessageToEdit: setMessageToEdit,
    style: textInputStyle
  }))), /*#__PURE__*/React.createElement(SafeAreaBottom, {
    height: bottom
  }))), mentionAvailable && props.SuggestedMentionList && /*#__PURE__*/React.createElement(props.SuggestedMentionList, {
    text: text,
    selection: selection,
    inputHeight: inputHeight,
    topInset: top,
    bottomInset: bottom,
    onPressToMention: onPressToMention,
    mentionedUsers: mentionedUsers
  }));
};
const useTypingTrigger = (text, channel) => {
  if (channel.isGroupChannel()) {
    useEffect(() => {
      if (text.length === 0) channel.endTyping();else channel.startTyping();
    }, [text]);
  }
};
const useTextClearOnDisabled = (setText, chatDisabled) => {
  useEffect(() => {
    if (chatDisabled) setText('');
  }, [chatDisabled]);
};
const useAutoFocusOnEditMode = (textInputRef, messageToEdit) => {
  useEffect(() => {
    if (messageToEdit !== null && messageToEdit !== void 0 && messageToEdit.isUserMessage()) {
      if (!AUTO_FOCUS) setTimeout(() => {
        var _textInputRef$current;
        return (_textInputRef$current = textInputRef.current) === null || _textInputRef$current === void 0 ? void 0 : _textInputRef$current.focus();
      }, 500);
    }
  }, [messageToEdit]);
};
const SafeAreaBottom = _ref => {
  let {
    height
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: {
      height
    }
  });
};
const styles = createStyleSheet({
  inputContainer: {
    justifyContent: 'center',
    width: '100%'
  },
  inputDefault: {
    height: 56
  },
  input: {
    flex: 1,
    marginRight: 4,
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 36,
    // Android - padding area is hidden
    // iOS - padding area is visible
    maxHeight: Platform.select({
      ios: 36 * 2 + 16,
      android: 36 * 2
    })
  }
});
export default /*#__PURE__*/React.memo(ChannelInput);
//# sourceMappingURL=index.js.map