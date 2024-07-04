"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitUtils = require("@sendbird/uikit-utils");
let isLayoutAnimationConfigured = false;
const configureNextLayoutAnimation = event => {
  if (isLayoutAnimationConfigured) return;
  const config = _reactNative.LayoutAnimation.create(event.duration, event.easing, _reactNative.LayoutAnimation.Properties.scaleY);
  isLayoutAnimationConfigured = true;
  const onEnd = () => isLayoutAnimationConfigured = false;
  _reactNative.LayoutAnimation.configureNext(config, onEnd, onEnd);
};
const {
  showEvent,
  hideEvent
} = _reactNative.Platform.select({
  android: {
    showEvent: 'keyboardDidShow',
    hideEvent: 'keyboardDidHide'
  },
  default: {
    showEvent: 'keyboardWillShow',
    hideEvent: 'keyboardWillHide'
  }
});
const useKeyboardStatus = () => {
  const [keyboardStatus, setKeyboardStatus] = (0, _react.useState)({
    visible: false,
    height: 0,
    bottomSpace: 0
  });
  const {
    bottom: bottomInset
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  (0, _react.useEffect)(() => {
    const subscriptions = [_reactNative.Keyboard.addListener(showEvent, event => {
      const height = event.endCoordinates.height;
      const bottomSpace = _reactNative.Platform.select({
        ios: height - bottomInset,
        default: 0
      });
      const nextLayoutAnimation = _reactNative.Platform.select({
        ios: configureNextLayoutAnimation,
        default: _uikitUtils.NOOP
      });
      nextLayoutAnimation(event);
      setKeyboardStatus({
        visible: true,
        height,
        bottomSpace
      });
    }), _reactNative.Keyboard.addListener(hideEvent, () => {
      const height = 0;
      const bottomSpace = _reactNative.Platform.select({
        default: height
      });
      // const nextLayoutAnimation = Platform.select({ ios: configureNextLayoutAnimation, default: NOOP });

      // nextLayoutAnimation(event);
      setKeyboardStatus({
        visible: false,
        height,
        bottomSpace
      });
    })];
    return () => {
      subscriptions.forEach(it => it.remove());
    };
  }, []);
  return keyboardStatus;
};
var _default = useKeyboardStatus;
exports.default = _default;
//# sourceMappingURL=useKeyboardStatus.js.map