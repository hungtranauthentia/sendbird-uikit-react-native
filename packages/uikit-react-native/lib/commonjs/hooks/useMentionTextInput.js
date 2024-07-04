"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("./useContext");
const useMentionTextInput = params => {
  const {
    mentionManager,
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const mentionedUsersRef = (0, _react.useRef)([]);
  const textInputRef = (0, _react.useRef)();
  const [text, setText] = (0, _react.useState)('');
  const [selection, setSelection] = (0, _react.useState)({
    start: 0,
    end: 0
  });

  // TODO: Refactor text edit logic more clearly
  (0, _react.useEffect)(() => {
    if (mentionManager.shouldUseMentionedMessageTemplate(params.messageToEdit, sbOptions.uikit.groupChannel.channel.enableMention)) {
      var _params$messageToEdit, _params$messageToEdit2;
      const result = mentionManager.templateToTextAndMentionedUsers(((_params$messageToEdit = params.messageToEdit) === null || _params$messageToEdit === void 0 ? void 0 : _params$messageToEdit.mentionedMessageTemplate) ?? '', ((_params$messageToEdit2 = params.messageToEdit) === null || _params$messageToEdit2 === void 0 ? void 0 : _params$messageToEdit2.mentionedUsers) ?? []);
      mentionedUsersRef.current = result.mentionedUsers;
      setText(result.mentionedText);
    } else {
      var _params$messageToEdit3;
      mentionedUsersRef.current = [];
      if ((_params$messageToEdit3 = params.messageToEdit) !== null && _params$messageToEdit3 !== void 0 && _params$messageToEdit3.isUserMessage()) {
        setText(params.messageToEdit.message);
      }
    }
  }, [params.messageToEdit]);
  const onChangeText = (0, _uikitUtils.useFreshCallback)((_nextText, addedMentionedUser) => {
    const prevText = text;
    let nextText = _nextText;
    let offset = nextText.length - prevText.length;

    // Text clear
    if (nextText === '') {
      mentionedUsersRef.current = [];
    }
    // Text add
    else if (offset > 0) {
      /** Add mentioned user **/
      if (addedMentionedUser) mentionedUsersRef.current.push(addedMentionedUser);

      /** Reconcile mentioned users range on the right side of the selection **/
      mentionedUsersRef.current = mentionManager.reconcileRangeOfMentionedUsers(offset, selection.end, mentionedUsersRef.current);
    }
    // Text remove
    else if (offset < 0) {
      // Ranged remove
      if (selection.start !== selection.end) {
        /** Filter mentioned users in selection range **/
        const {
          filtered,
          lastSelection
        } = mentionManager.removeMentionedUsersInSelection(selection, mentionedUsersRef.current);

        /** Reconcile mentioned users range on the right side of the selection **/
        mentionedUsersRef.current = mentionManager.reconcileRangeOfMentionedUsers(offset, Math.max(selection.end, lastSelection), filtered);
      }
      // Single remove
      else {
        /** Find mentioned user who ranges in removed selection **/
        const foundIndex = mentionedUsersRef.current.findIndex(it => mentionManager.rangeHelpers.overlaps(it.range, selection, 'underMore'));
        /** If found, remove from the mentioned user list and remove remainder text **/
        if (foundIndex > -1) {
          const it = mentionedUsersRef.current[foundIndex];
          const remainderLength = it.range.end - it.range.start + offset;
          offset = -remainderLength + offset;
          nextText = (0, _uikitUtils.replace)(nextText, it.range.start, it.range.start + remainderLength, '');
          mentionedUsersRef.current.splice(foundIndex, 1);
        }

        /** Reconcile mentioned users range on the right side of the selection **/
        mentionedUsersRef.current = mentionManager.reconcileRangeOfMentionedUsers(offset, selection.end, mentionedUsersRef.current);
      }
    }
    setText(nextText);
  });
  return {
    textInputRef,
    selection,
    onSelectionChange: (0, _uikitUtils.useFreshCallback)(e => {
      const nativeSelection = {
        ...e.nativeEvent.selection
      };

      // NOTE: To synchronize call onSelectionChange after onChangeText called on each platform.
      setTimeout(() => {
        const mentionedUser = mentionedUsersRef.current.find(it => mentionManager.rangeHelpers.overlaps(it.range, nativeSelection));

        // Selection should be blocked if changed into mentioned area
        if (mentionedUser) {
          var _textInputRef$current;
          const selectionBlock = {
            start: mentionedUser.range.start,
            end: mentionedUser.range.end
          };
          (_textInputRef$current = textInputRef.current) === null || _textInputRef$current === void 0 ? void 0 : _textInputRef$current.setNativeProps({
            selection: selectionBlock
          });
          // BUG: setNativeProps called again when invoked onChangeText
          //  https://github.com/facebook/react-native/issues/33520
          if (_reactNative.Platform.OS === 'android') {
            setTimeout(() => {
              var _textInputRef$current2;
              (_textInputRef$current2 = textInputRef.current) === null || _textInputRef$current2 === void 0 ? void 0 : _textInputRef$current2.setNativeProps({
                selection: {
                  start: 0
                }
              });
            }, 250);
          }
          setSelection(selectionBlock);
        } else {
          setSelection(nativeSelection);
        }
      }, 10);
    }),
    text,
    onChangeText,
    mentionedUsers: mentionedUsersRef.current
  };
};
var _default = useMentionTextInput;
exports.default = _default;
//# sourceMappingURL=useMentionTextInput.js.map