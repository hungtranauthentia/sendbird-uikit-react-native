"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Box = _interopRequireDefault(require("../Box"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ProgressBar = _ref => {
  let {
    current = 100,
    total = 100,
    trackColor,
    barColor,
    overlay,
    style
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const uiColors = {
    track: trackColor ?? colors.primary,
    bar: barColor ?? colors.onBackground01
  };
  const progress = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const percent = current / total;
  const stopped = percent === 0;
  (0, _react.useEffect)(() => {
    if (!Number.isNaN(percent)) {
      const animation = _reactNative.Animated.timing(progress, {
        toValue: stopped ? 0 : percent,
        duration: stopped ? 0 : 100,
        useNativeDriver: false,
        easing: _reactNative.Easing.linear
      });
      animation.start();
      return () => animation.stop();
    }
    return _uikitUtils.NOOP;
  }, [percent]);
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    height: 36,
    flexDirection: 'row',
    backgroundColor: uiColors.track,
    alignItems: 'center',
    overflow: 'hidden',
    style: style
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      position: 'absolute',
      width: progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp'
      }),
      height: '100%',
      opacity: 0.38,
      backgroundColor: uiColors.bar
    }
  }), /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: _reactNative.StyleSheet.absoluteFill
  }, overlay));
};
var _default = ProgressBar;
exports.default = _default;
//# sourceMappingURL=index.js.map