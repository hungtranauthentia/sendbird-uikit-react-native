"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _message = require("@sendbird/chat/message");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const EditInput = /*#__PURE__*/(0, _react.forwardRef)(function EditInput(_ref, ref) {
  let {
    style,
    text,
    onChangeText,
    messageToEdit,
    setMessageToEdit,
    onPressUpdateUserMessage,
    onSelectionChange,
    autoFocus,
    mentionedUsers,
    inputDisabled
  } = _ref;
  const {
    mentionManager,
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const onPressCancel = () => {
    setMessageToEdit();
    onChangeText('');
  };
  const onPressSave = () => {
    if (messageToEdit.isUserMessage()) {
      const mentionType = _message.MentionType.USERS;
      const mentionedUserIds = mentionedUsers.map(it => it.user.userId);
      const mentionedMessageTemplate = mentionManager.textToMentionedMessageTemplate(text, mentionedUsers, sbOptions.uikit.groupChannel.channel.enableMention);
      onPressUpdateUserMessage(messageToEdit, {
        message: text,
        mentionType,
        mentionedUserIds,
        mentionedMessageTemplate
      }).catch(onFailureToUpdate);
    }
    setMessageToEdit();
    onChangeText('');
  };
  const onFailureToUpdate = () => toast.show(STRINGS.TOAST.UPDATE_MSG_ERROR, 'error');
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.editInputContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.inputWrapper
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.TextInput, {
    ref: ref,
    multiline: true,
    disableFullscreenUI: true,
    editable: !inputDisabled,
    autoFocus: autoFocus,
    onChangeText: onChangeText,
    style: style,
    placeholder: STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_ACTIVE,
    onSelectionChange: onSelectionChange
  }, mentionManager.textToMentionedComponents(text, mentionedUsers, sbOptions.uikit.groupChannel.channel.enableMention))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 8,
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Button, {
    variant: 'text',
    onPress: onPressCancel
  }, STRINGS.LABELS.CHANNEL_INPUT_EDIT_CANCEL), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.space
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Button, {
    variant: 'contained',
    onPress: onPressSave
  }, STRINGS.LABELS.CHANNEL_INPUT_EDIT_OK)));
});
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  editInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputWrapper: {
    flexDirection: 'row'
  },
  space: {
    flex: 1
  }
});
var _default = EditInput;
exports.default = _default;
//# sourceMappingURL=EditInput.js.map