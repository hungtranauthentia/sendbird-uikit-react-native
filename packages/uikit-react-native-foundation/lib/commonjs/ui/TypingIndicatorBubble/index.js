"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Avatar = _interopRequireDefault(require("../Avatar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TypingIndicatorBubble = _ref => {
  let {
    typingUsers,
    containerStyle,
    maxAvatar
  } = _ref;
  const {
    select,
    palette,
    colors
  } = (0, _useUIKitTheme.default)();
  if (typingUsers.length === 0) return null;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default.Stack, {
    size: 26,
    maxAvatar: maxAvatar,
    styles: {
      remainsTextColor: colors.onBackground02,
      remainsBackgroundColor: select({
        light: palette.background100,
        dark: palette.background400
      })
    },
    containerStyle: {
      marginRight: 12
    }
  }, typingUsers.map((user, index) => /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    key: index,
    uri: user.profileUrl
  }))), /*#__PURE__*/_react.default.createElement(TypingDots, {
    dotColor: select({
      light: palette.background100,
      dark: palette.background400
    }),
    backgroundColor: colors.onBackground02
  }));
};
const TypingDots = _ref2 => {
  let {
    dotColor,
    backgroundColor
  } = _ref2;
  const animation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const dots = matrix.map(_ref3 => {
    let [timeline, scale, opacity] = _ref3;
    return [animation.interpolate({
      inputRange: timeline,
      outputRange: scale,
      extrapolate: 'clamp'
    }), animation.interpolate({
      inputRange: timeline,
      outputRange: opacity,
      extrapolate: 'clamp'
    })];
  });
  (0, _react.useEffect)(() => {
    const animated = _reactNative.Animated.loop(_reactNative.Animated.timing(animation, {
      toValue: 1.4,
      duration: 1400,
      easing: _reactNative.Easing.linear,
      useNativeDriver: true
    }));
    animated.start();
    return () => animated.reset();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 34,
    backgroundColor: dotColor
  }, dots.map((_ref4, index) => {
    let [scale, opacity] = _ref4;
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      key: index,
      style: [styles.dot, {
        marginRight: index === dots.length - 1 ? 0 : 6,
        opacity: opacity,
        transform: [{
          scale: scale
        }],
        backgroundColor: backgroundColor
      }]
    });
  }));
};
const matrix = [[[0.4, 0.7, 1.0], [1.0, 1.2, 1.0], [0.12, 0.38, 0.12]], [[0.6, 0.9, 1.2], [1.0, 1.2, 1.0], [0.12, 0.38, 0.12]], [[0.8, 1.1, 1.4], [1.0, 1.2, 1.0], [0.12, 0.38, 0.12]]];
const styles = (0, _createStyleSheet.default)({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  }
});
var _default = TypingIndicatorBubble;
exports.default = _default;
//# sourceMappingURL=index.js.map