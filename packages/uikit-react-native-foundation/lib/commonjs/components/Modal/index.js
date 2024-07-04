"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useHeaderStyle = _interopRequireDefault(require("../../styles/useHeaderStyle"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  } = (0, _useUIKitTheme.default)();
  const {
    content,
    backdrop,
    showTransition,
    hideTransition
  } = useModalAnimation(type);
  const panResponder = useModalPanResponder(type, content.translateY, showTransition, onClose);
  const {
    topInset
  } = (0, _useHeaderStyle.default)();
  const [modalVisible, setModalVisible] = (0, _react.useState)(false);
  const showAction = () => setModalVisible(true);
  const hideAction = () => hideTransition(() => setModalVisible(false));
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  (0, _react.useEffect)(() => {
    if (visible) showAction();else hideAction();
  }, [visible]);
  useOnDismiss(modalVisible, onDismiss);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, _extends({
    statusBarTranslucent: statusBarTranslucent,
    transparent: true,
    hardwareAccelerated: true,
    visible: modalVisible,
    onRequestClose: onClose,
    onShow: () => showTransition(),
    onDismiss: onDismiss,
    supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'],
    animationType: 'none'
  }, props), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: disableBackgroundClose ? undefined : onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      opacity: backdrop.opacity,
      backgroundColor: palette.onBackgroundLight03
    }]
  })), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView
  // NOTE: This is trick for Android.
  //  When orientation is changed on Android, the offset that to avoid soft-keyboard is not updated normally.
  , {
    key: _reactNative.Platform.OS === 'android' && enableKeyboardAvoid ? `${width}-${height}` : undefined,
    enabled: enableKeyboardAvoid,
    style: styles.background,
    behavior: _reactNative.Platform.select({
      ios: 'padding',
      default: 'height'
    }),
    pointerEvents: 'box-none',
    keyboardVerticalOffset: enableKeyboardAvoid && statusBarTranslucent ? -topInset : 0
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({
    style: [styles.background, backgroundStyle, {
      opacity: content.opacity,
      transform: [{
        translateY: content.translateY
      }]
    }],
    pointerEvents: 'box-none'
  }, panResponder.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable
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
  return _react.default.useRef(_reactNative.PanResponder.create({
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
  const initialY = type === 'fade' ? 0 : _reactNative.Dimensions.get('window').height;
  const baseAnimBackground = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const baseAnimContent = (0, _react.useRef)(new _reactNative.Animated.Value(initialY)).current;
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
    return _reactNative.Animated.parallel([_reactNative.Animated.timing(baseAnimBackground, {
      toValue,
      ...config
    }), _reactNative.Animated.timing(baseAnimContent, {
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
  (0, _react.useEffect)(() => {
    if (_reactNative.Platform.OS === 'ios') return;
    if (prevVisible && !visible) onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
  }, [prevVisible, visible]);
};
const usePrevProp = prop => {
  const prev = (0, _react.useRef)(prop);
  const curr = (0, _react.useRef)(prop);
  (0, _react.useEffect)(() => {
    prev.current = curr.current;
    curr.current = prop;
  });
  return prev.current;
};
const styles = (0, _createStyleSheet.default)({
  background: {
    flex: 1
  }
});
var _default = Modal;
exports.default = _default;
//# sourceMappingURL=index.js.map