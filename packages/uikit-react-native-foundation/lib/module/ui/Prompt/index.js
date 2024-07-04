import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, View, useWindowDimensions } from 'react-native';
import { NOOP } from '@sendbird/uikit-utils';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import createStyleSheet from '../../styles/createStyleSheet';
import useHeaderStyle from '../../styles/useHeaderStyle';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Button from '../Button';
import DialogBox from '../Dialog/DialogBox';
const Prompt = _ref => {
  let {
    onDismiss,
    visible,
    onHide,
    autoFocus = true,
    title,
    defaultValue = '',
    placeholder = 'Enter',
    onSubmit = NOOP,
    onCancel = NOOP,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel'
  } = _ref;
  const {
    statusBarTranslucent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const inputRef = useRef(null);
  const {
    width,
    height
  } = useWindowDimensions();
  const buttons = [{
    text: cancelLabel,
    onPress: onCancel
  }, {
    text: submitLabel,
    onPress: () => onSubmit(text)
  }];
  const [text, setText] = useState(defaultValue);

  // FIXME: autoFocus trick with modal
  // Android
  // - InputProps.autoFocus is not trigger keyboard appearing.
  // - InputRef.focus() is trigger keyboard appearing, but position of keyboard selection is always the start of text.
  // iOS
  // - InputProps.autoFocus is trigger weird UI behavior on landscape mode.
  useEffect(() => {
    if (autoFocus && visible) {
      setTimeout(() => {
        var _inputRef$current, _inputRef$current2;
        if (Platform.OS === 'android') (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
      }, 250);
    }
  }, [autoFocus, visible, `${width}-${height}`]);
  return /*#__PURE__*/React.createElement(Modal, {
    enableKeyboardAvoid: true,
    disableBackgroundClose: true,
    onClose: onHide,
    onDismiss: () => {
      setText('');
      onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
    },
    statusBarTranslucent: statusBarTranslucent,
    visible: visible,
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(DialogBox, {
    style: styles.container
  }, Boolean(title) && /*#__PURE__*/React.createElement(View, {
    style: styles.titleContainer
  }, /*#__PURE__*/React.createElement(Text, {
    h1: true,
    color: colors.ui.dialog.default.none.text,
    numberOfLines: 1,
    style: {
      flex: 1
    }
  }, title)), /*#__PURE__*/React.createElement(View, {
    style: styles.inputContainer
  }, /*#__PURE__*/React.createElement(TextInput, {
    autoFocus: autoFocus && Platform.OS === 'android',
    ref: inputRef,
    placeholder: placeholder,
    variant: 'underline',
    value: text,
    onChangeText: setText,
    style: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 10,
      paddingBottom: 10
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, buttons.map((_ref2, index) => {
    let {
      text,
      onPress
    } = _ref2;
    return /*#__PURE__*/React.createElement(Button, {
      key: text + index,
      variant: 'text',
      style: styles.button,
      contentColor: colors.ui.dialog.default.none.highlight,
      onPress: () => {
        Keyboard.dismiss();
        try {
          onPress === null || onPress === void 0 ? void 0 : onPress();
        } finally {
          onHide();
        }
      }
    }, text);
  }))));
};
const styles = createStyleSheet({
  container: {
    paddingTop: 8
  },
  titleContainer: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    paddingHorizontal: 24,
    marginBottom: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12
  },
  button: {
    marginLeft: 8
  }
});
export default Prompt;
//# sourceMappingURL=index.js.map