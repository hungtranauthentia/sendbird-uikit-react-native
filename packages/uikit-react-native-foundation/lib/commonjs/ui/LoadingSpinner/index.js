"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const LoadingSpinner = _ref => {
  let {
    size = 24,
    color,
    style
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(Rotate, {
    style: style
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: 'spinner',
    size: size,
    color: color ?? colors.primary
  }));
};
const useLoopAnimated = function (duration) {
  let useNativeDriver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const animated = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(animated, {
      toValue: 1,
      duration,
      useNativeDriver,
      easing: _reactNative.Easing.inOut(_reactNative.Easing.linear)
    }), {
      resetBeforeIteration: true
    }).start();
    return () => {
      animated.stopAnimation();
      animated.setValue(0);
    };
  }, []);
  return animated;
};
const Rotate = _ref2 => {
  let {
    children,
    style
  } = _ref2;
  const loop = useLoopAnimated(1000);
  const rotate = loop.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [style, {
      transform: [{
        rotate
      }]
    }]
  }, children);
};
var _default = LoadingSpinner;
exports.default = _default;
//# sourceMappingURL=index.js.map