import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Logger } from '@sendbird/uikit-utils';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useHeaderStyle from '../../styles/useHeaderStyle';
import useUIKitTheme from '../../theme/useUIKitTheme';
import DialogBox from '../Dialog/DialogBox';
import LoadingSpinner from '../LoadingSpinner';
const ActionMenu = _ref => {
  let {
    visible,
    onHide,
    onError,
    onDismiss,
    title,
    menuItems
  } = _ref;
  const {
    statusBarTranslucent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const [pending, setPending] = useState(false);
  const _onHide = () => {
    if (!pending) onHide();
  };
  return /*#__PURE__*/React.createElement(Modal, {
    onClose: _onHide,
    onDismiss: onDismiss,
    statusBarTranslucent: statusBarTranslucent,
    visible: visible,
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(DialogBox, null, /*#__PURE__*/React.createElement(View, {
    style: styles.title
  }, /*#__PURE__*/React.createElement(Text, {
    h1: true,
    color: colors.ui.dialog.default.none.text,
    numberOfLines: 1
    // style={{ flex: 1 }}
    ,
    style: {
      maxWidth: pending ? '86%' : '100%'
    }
  }, title), pending && /*#__PURE__*/React.createElement(LoadingSpinner, {
    size: 20,
    color: colors.ui.dialog.default.none.highlight,
    style: {
      width: '10%',
      marginLeft: '4%'
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, menuItems.map((item, index) => {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      activeOpacity: 0.75,
      key: item.title + index,
      style: styles.button,
      disabled: pending,
      onPress: async () => {
        setPending(true);
        try {
          var _item$onPress;
          await ((_item$onPress = item.onPress) === null || _item$onPress === void 0 ? void 0 : _item$onPress.call(item));
        } catch (e) {
          const errorHandler = onError ?? item.onError;
          errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(e);
          if (!errorHandler) Logger.error('ActionMenu onPress error', e);
        } finally {
          onHide();
          setPending(false);
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      subtitle2: true,
      color: item.style === 'destructive' ? colors.ui.dialog.default.none.destructive : colors.ui.dialog.default.none.text,
      numberOfLines: 1
    }, item.title));
  }))));
};
const styles = createStyleSheet({
  title: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 4,
    marginBottom: 8
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12
  }
});
export default ActionMenu;
//# sourceMappingURL=index.js.map