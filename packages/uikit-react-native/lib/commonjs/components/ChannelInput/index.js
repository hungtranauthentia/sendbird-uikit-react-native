"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeKeyboardController = require("react-native-keyboard-controller");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _useMentionTextInput = _interopRequireDefault(require("../../hooks/useMentionTextInput"));
var _AttachmentsButton = _interopRequireDefault(require("./AttachmentsButton"));
var _EditInput = _interopRequireDefault(require("./EditInput"));
var _MessageToReplyPreview = require("./MessageToReplyPreview");
var _SendInput = _interopRequireDefault(require("./SendInput"));
var _VoiceMessageInput = _interopRequireDefault(require("./VoiceMessageInput"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AUTO_FOCUS = _reactNative.Platform.select({
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
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colors,
    typography
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    sbOptions,
    mentionManager
  } = (0, _useContext.useSendbirdChat)();
  const {
    selection,
    onSelectionChange,
    textInputRef,
    text,
    onChangeText,
    mentionedUsers
  } = (0, _useMentionTextInput.default)({
    messageToEdit
  });
  const inputMode = (0, _uikitUtils.useIIFE)(() => {
    if (messageToEdit && !messageToEdit.isFileMessage()) return 'edit';else return 'send';
  });
  const mentionAvailable = sbOptions.uikit.groupChannel.channel.enableMention && channel.isGroupChannel() && !channel.isBroadcast;
  const inputKeyToRemount = GET_INPUT_KEY(mentionAvailable ? mentionedUsers.length === 0 : false);
  const [inputHeight, setInputHeight] = (0, _react.useState)(styles.inputDefault.height);
  const fontStyle = (0, _react.useMemo)(() => {
    if (!typography.body3.fontSize) return typography.body3;
    // NOTE: iOS does not support textAlignVertical, so we should adjust lineHeight to center the text in multiline TextInput.
    return {
      ...typography.body3,
      lineHeight: typography.body3.fontSize * 1.275,
      textAlignVertical: 'center'
    };
  }, [typography.body3.fontSize]);
  const textInputStyle = _reactNative.StyleSheet.flatten([styles.input, fontStyle, props.style]);
  useTypingTrigger(text, channel);
  useTextClearOnDisabled(onChangeText, props.inputDisabled);
  useAutoFocusOnEditMode(textInputRef, messageToEdit);
  const onPressToMention = (user, searchStringRange) => {
    const mentionedMessageText = mentionManager.asMentionedMessageText(user, true);
    const range = {
      start: searchStringRange.start,
      end: searchStringRange.start + mentionedMessageText.length - 1
    };
    onChangeText((0, _uikitUtils.replace)(text, searchStringRange.start, searchStringRange.end, mentionedMessageText), {
      user,
      range
    });
  };
  if (!props.shouldRenderInput) {
    return /*#__PURE__*/_react.default.createElement(SafeAreaBottom, {
      height: bottom
    });
  }
  console.log('KeyboardAvoidingView 2');
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeKeyboardController.KeyboardAvoidingView, {
    keyboardVerticalOffset: keyboardAvoidOffset,
    behavior: "padding"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingLeft: left,
      paddingRight: right,
      backgroundColor: colors.background
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onLayout: e => setInputHeight(e.nativeEvent.layout.height),
    style: styles.inputContainer
  }, inputMode === 'send' && /*#__PURE__*/_react.default.createElement(_SendInput.default, _extends({}, props, {
    key: inputKeyToRemount,
    ref: textInputRef,
    text: text,
    onChangeText: onChangeText,
    onSelectionChange: onSelectionChange,
    mentionedUsers: mentionedUsers,
    VoiceMessageInput: props.VoiceMessageInput ?? _VoiceMessageInput.default,
    AttachmentsButton: props.AttachmentsButton ?? _AttachmentsButton.default,
    MessageToReplyPreview: props.MessageToReplyPreview ?? _MessageToReplyPreview.MessageToReplyPreview,
    style: textInputStyle
  })), inputMode === 'edit' && messageToEdit && /*#__PURE__*/_react.default.createElement(_EditInput.default, _extends({}, props, {
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
  }))), /*#__PURE__*/_react.default.createElement(SafeAreaBottom, {
    height: bottom
  }))), mentionAvailable && props.SuggestedMentionList && /*#__PURE__*/_react.default.createElement(props.SuggestedMentionList, {
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
    (0, _react.useEffect)(() => {
      if (text.length === 0) channel.endTyping();else channel.startTyping();
    }, [text]);
  }
};
const useTextClearOnDisabled = (setText, chatDisabled) => {
  (0, _react.useEffect)(() => {
    if (chatDisabled) setText('');
  }, [chatDisabled]);
};
const useAutoFocusOnEditMode = (textInputRef, messageToEdit) => {
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height
    }
  });
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
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
    maxHeight: _reactNative.Platform.select({
      ios: 36 * 2 + 16,
      android: 36 * 2
    })
  }
});
var _default = /*#__PURE__*/_react.default.memo(ChannelInput);
exports.default = _default;
//# sourceMappingURL=index.js.map