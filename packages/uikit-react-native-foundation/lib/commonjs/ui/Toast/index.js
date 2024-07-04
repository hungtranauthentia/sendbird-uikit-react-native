"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToast = exports.default = exports.ToastProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ToastContext = /*#__PURE__*/(0, _react.createContext)(null);
const useOpacity = () => {
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const transition = value => {
    _reactNative.Animated.timing(opacity, {
      toValue: value,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  return {
    opacity,
    show: () => transition(1),
    hide: () => transition(0)
  };
};
const Toast = _ref => {
  let {
    visible,
    type,
    children,
    top,
    bottom
  } = _ref;
  const {
    colors,
    select,
    palette
  } = (0, _useUIKitTheme.default)();
  const {
    opacity,
    show,
    hide
  } = useOpacity();
  const color = (0, _react.useMemo)(() => {
    if (type === 'error') {
      return select({
        dark: palette.error300,
        light: palette.error200
      });
    }
    if (type === 'success') {
      return select({
        dark: palette.secondary300,
        light: palette.secondary200
      });
    }
    return 'transparent';
  }, [type, select]);
  const backgroundColor = (0, _react.useMemo)(() => {
    return select({
      light: 'rgba(0,0,0,0.64)',
      dark: 'rgba(255,255,255,0.64)'
    });
  }, [select]);
  (0, _react.useEffect)(() => {
    visible ? show() : hide();
  }, [visible]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    pointerEvents: 'none',
    style: [styles.toast, {
      opacity,
      top,
      bottom,
      backgroundColor
    }]
  }, type !== 'normal' && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: type === 'success' ? 'done' : 'error',
    color: color,
    containerStyle: styles.icon
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    color: colors.onBackgroundReverse01,
    body3: true,
    numberOfLines: 2,
    style: styles.text
  }, children));
};
const VISIBLE_MS = 3000;
const ToastProvider = _ref2 => {
  let {
    children,
    dismissTimeout = VISIBLE_MS
  } = _ref2;
  const [state, setState] = (0, _react.useState)({
    visible: false,
    type: 'error',
    text: ''
  });
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  (0, _react.useEffect)(() => {
    if (!state.visible) return;
    const hideTimeout = setTimeout(() => {
      setState(prev => ({
        ...prev,
        visible: false
      }));
    }, dismissTimeout);
    return () => clearTimeout(hideTimeout);
  });
  return /*#__PURE__*/_react.default.createElement(ToastContext.Provider, {
    value: {
      show: function (text) {
        let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';
        return text && setState({
          text,
          type,
          visible: true
        });
      }
    }
  }, children, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    behavior: _reactNative.Platform.OS === 'ios' ? 'position' : undefined,
    keyboardVerticalOffset: -bottom,
    pointerEvents: 'none'
  }, /*#__PURE__*/_react.default.createElement(Toast, {
    type: state.type,
    visible: state.visible,
    bottom: bottom + styles.toastPosition.bottom
  }, state.text)));
};
exports.ToastProvider = ToastProvider;
const useToast = () => {
  const context = (0, _react.useContext)(ToastContext);
  if (!context) throw new Error('ToastContext is not provided, wrap your app with ToastProvider');
  return context;
};
exports.useToast = useToast;
const styles = (0, _createStyleSheet.default)({
  toast: {
    position: 'absolute',
    height: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    flexDirection: 'row'
  },
  icon: {
    marginRight: 4
  },
  text: {
    maxWidth: 240,
    paddingHorizontal: 4
  },
  toastPosition: {
    bottom: 60
  }
});
var _default = Toast;
exports.default = _default;
//# sourceMappingURL=index.js.map