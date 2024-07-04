function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, PanResponder, Platform, Pressable, Modal as RNModal, StyleSheet, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import createStyleSheet from '../../styles/createStyleSheet';
import useHeaderStyle from '../../styles/useHeaderStyle';
import useUIKitTheme from '../../theme/useUIKitTheme';
/**
 * Modal Open: Triggered by Modal.props.visible state changed to true
 * - visible true -> modalVisible true -> animation start
 *
 * Modal Close: Triggered by Modal.props.onClose() call
 * - Modal.props.onClose() -> visible false -> animation start -> modalVisible false
 * */
const Modal = _ref => {
  let {
    children,
    onClose,
    backgroundStyle,
    onDismiss,
    type = 'fade',
    visible = false,
    disableBackgroundClose = false,
    enableKeyboardAvoid = false,
    statusBarTranslucent,
    ...props
  } = _ref;
  const {
    palette
  } = useUIKitTheme();
  const {
    content,
    backdrop,
    showTransition,
    hideTransition
  } = useModalAnimation(type);
  const panResponder = useModalPanResponder(type, content.translateY, showTransition, onClose);
  const {
    topInset
  } = useHeaderStyle();
  const [modalVisible, setModalVisible] = useState(false);
  const showAction = () => setModalVisible(true);
  const hideAction = () => hideTransition(() => setModalVisible(false));
  const {
    width,
    height
  } = useWindowDimensions();
  useEffect(() => {
    if (visible) showAction();else hideAction();
  }, [visible]);
  useOnDismiss(modalVisible, onDismiss);
  return /*#__PURE__*/React.createElement(RNModal, _extends({
    statusBarTranslucent: statusBarTranslucent,
    transparent: true,
    hardwareAccelerated: true,
    visible: modalVisible,
    onRequestClose: onClose,
    onShow: () => showTransition(),
    onDismiss: onDismiss,
    supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'],
    animationType: 'none'
  }, props), /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: disableBackgroundClose ? undefined : onClose
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [StyleSheet.absoluteFill, {
      opacity: backdrop.opacity,
      backgroundColor: palette.onBackgroundLight03
    }]
  })), /*#__PURE__*/React.createElement(KeyboardAvoidingView
  // NOTE: This is trick for Android.
  //  When orientation is changed on Android, the offset that to avoid soft-keyboard is not updated normally.
  , {
    key: Platform.OS === 'android' && enableKeyboardAvoid ? `${width}-${height}` : undefined,
    enabled: enableKeyboardAvoid,
    style: styles.background,
    behavior: Platform.select({
      ios: 'padding',
      default: 'height'
    }),
    pointerEvents: 'box-none',
    keyboardVerticalOffset: enableKeyboardAvoid && statusBarTranslucent ? -topInset : 0
  }, /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [styles.background, backgroundStyle, {
      opacity: content.opacity,
      transform: [{
        translateY: content.translateY
      }]
    }],
    pointerEvents: 'box-none'
  }, panResponder.panHandlers), /*#__PURE__*/React.createElement(Pressable
  // NOTE: https://github.com/facebook/react-native/issues/14295
  //  Due to 'Pressable', the width of the children must be explicitly specified as a number.
  , null, children))));
};
const isHideGesture = (distanceY, velocityY) => {
  return distanceY > 125 || distanceY > 0 && velocityY > 0.1;
};
const useModalPanResponder = (type, translateY, show, hide) => {
  if (type === 'fade' || type === 'slide-no-gesture') return {
    panHandlers: {}
  };
  return React.useRef(PanResponder.create({
    onMoveShouldSetPanResponderCapture: (_, _ref2) => {
      let {
        dy
      } = _ref2;
      return dy > 8;
    },
    // @ts-ignore
    onPanResponderGrant: () => translateY.setOffset(translateY.__getValue()),
    onPanResponderMove: (_, _ref3) => {
      let {
        dy
      } = _ref3;
      return dy >= 0 && translateY.setValue(dy);
    },
    // Animated.event([null, { dy: translateY }], { useNativeDriver: false }),
    onPanResponderRelease: (_, _ref4) => {
      let {
        dy,
        vy
      } = _ref4;
      if (isHideGesture(dy, vy)) hide();else show();
    }
  })).current;
};
const useModalAnimation = type => {
  const initialY = type === 'fade' ? 0 : Dimensions.get('window').height;
  const baseAnimBackground = useRef(new Animated.Value(0)).current;
  const baseAnimContent = useRef(new Animated.Value(initialY)).current;
  const content = {
    opacity: baseAnimBackground.interpolate({
      inputRange: [0, 1],
      outputRange: [type === 'fade' ? 0 : 1, 1]
    }),
    translateY: baseAnimContent
  };
  const backdrop = {
    opacity: baseAnimBackground.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
  };
  const createTransition = toValue => {
    const config = {
      duration: 250,
      useNativeDriver: false
    };
    return Animated.parallel([Animated.timing(baseAnimBackground, {
      toValue,
      ...config
    }), Animated.timing(baseAnimContent, {
      toValue: toValue === 0 ? initialY : 0,
      ...config
    })]).start;
  };
  return {
    content,
    backdrop,
    showTransition: createTransition(1),
    hideTransition: createTransition(0)
  };
};

// NOTE: onDismiss is supports iOS only
const useOnDismiss = (visible, onDismiss) => {
  const prevVisible = usePrevProp(visible);
  useEffect(() => {
    if (Platform.OS === 'ios') return;
    if (prevVisible && !visible) onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
  }, [prevVisible, visible]);
};
const usePrevProp = prop => {
  const prev = useRef(prop);
  const curr = useRef(prop);
  useEffect(() => {
    prev.current = curr.current;
    curr.current = prop;
  });
  return prev.current;
};
const styles = createStyleSheet({
  background: {
    flex: 1
  }
});
export default Modal;
//# sourceMappingURL=index.js.map