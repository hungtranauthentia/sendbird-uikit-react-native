import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from '../../components/Modal';
import useHeaderStyle from '../../styles/useHeaderStyle';
import DialogSheet from '../Dialog/DialogSheet';
const BottomSheet = _ref => {
  let {
    onDismiss,
    onHide,
    visible,
    sheetItems,
    HeaderComponent
  } = _ref;
  const {
    statusBarTranslucent
  } = useHeaderStyle();
  const {
    width
  } = useWindowDimensions();
  const {
    bottom,
    left,
    right
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(Modal, {
    type: 'slide',
    onClose: onHide,
    onDismiss: onDismiss,
    statusBarTranslucent: statusBarTranslucent,
    visible: visible,
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(DialogSheet, {
    style: {
      width,
      paddingBottom: bottom
    }
  }, HeaderComponent && /*#__PURE__*/React.createElement(HeaderComponent, {
    onClose: onHide
  }), sheetItems.map((_ref2, idx) => {
    let {
      onPress,
      ...props
    } = _ref2;
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      activeOpacity: 0.75,
      key: props.title + idx,
      style: {
        paddingLeft: left,
        paddingRight: right
      },
      disabled: props.disabled,
      onPress: async () => {
        await onHide();
        try {
          onPress();
        } catch {}
      }
    }, /*#__PURE__*/React.createElement(DialogSheet.Item, props));
  })));
};
export default BottomSheet;
//# sourceMappingURL=index.js.map