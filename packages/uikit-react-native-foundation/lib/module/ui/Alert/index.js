import React from 'react';
import { View } from 'react-native';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useHeaderStyle from '../../styles/useHeaderStyle';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Button from '../Button';
import DialogBox from '../Dialog/DialogBox';
const Alert = _ref => {
  let {
    onDismiss,
    visible,
    onHide,
    title = '',
    message = '',
    buttons = [{
      text: 'OK'
    }]
  } = _ref;
  const {
    statusBarTranslucent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: onHide,
    onDismiss: onDismiss,
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
    style: styles.messageContainer
  }, Boolean(message) && /*#__PURE__*/React.createElement(Text, {
    subtitle2: !title,
    body3: Boolean(title),
    color: !title ? colors.ui.dialog.default.none.text : colors.ui.dialog.default.none.message,
    numberOfLines: 3
  }, message)), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, buttons.map((_ref2, index) => {
    let {
      text = 'OK',
      style = 'default',
      onPress
    } = _ref2;
    return /*#__PURE__*/React.createElement(Button, {
      key: text + index,
      variant: 'text',
      style: styles.button,
      onPress: async () => {
        try {
          onPress === null || onPress === void 0 ? void 0 : onPress();
        } finally {
          onHide();
        }
      },
      contentColor: style === 'destructive' ? colors.ui.dialog.default.none.destructive : colors.ui.dialog.default.none.highlight
    }, text);
  }))));
};
const styles = createStyleSheet({
  container: {
    paddingTop: 20
  },
  titleContainer: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  messageContainer: {
    paddingHorizontal: 24,
    marginBottom: 12
  },
  button: {
    marginLeft: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12
  }
});
export default Alert;
//# sourceMappingURL=index.js.map