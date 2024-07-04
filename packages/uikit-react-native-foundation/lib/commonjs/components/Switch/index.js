"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Switch = _ref => {
  let {
    value,
    onChangeValue,
    inactiveThumbColor,
    inactiveTrackColor,
    trackColor,
    thumbColor
  } = _ref;
  const {
    select,
    palette,
    colors
  } = (0, _useUIKitTheme.default)();
  const position = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    const animation = _reactNative.Animated.timing(position, {
      toValue: value ? styles.thumbOn.left : styles.thumbOff.left,
      duration: 150,
      useNativeDriver: false
    });
    animation.start();
    return () => animation.stop();
  }, [value]);
  const createInterpolate = (offValue, onValue) => {
    return position.interpolate({
      inputRange: [styles.thumbOff.left, styles.thumbOn.left],
      outputRange: [offValue, onValue],
      extrapolate: 'clamp'
    });
  };
  const _trackColor = createInterpolate(inactiveTrackColor ?? colors.onBackground04, trackColor ?? palette.primary200);
  const _thumbColor = createInterpolate(inactiveThumbColor ?? palette.background300, thumbColor ?? select({
    light: palette.primary400,
    dark: palette.primary300
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => onChangeValue(!value),
    style: [styles.container]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.track, {
      backgroundColor: _trackColor
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.thumb, {
      backgroundColor: _thumbColor,
      transform: [{
        translateX: position
      }]
    }]
  }));
};
const OFFSET = {
  W: 20,
  H: 16
};
const styles = (0, _createStyleSheet.default)({
  container: {
    width: OFFSET.W + OFFSET.H,
    height: OFFSET.H,
    alignItems: 'center',
    justifyContent: 'center'
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: OFFSET.H / 2,
    position: 'absolute'
  },
  thumb: {
    width: OFFSET.W,
    height: OFFSET.W,
    borderRadius: OFFSET.W / 2,
    ..._reactNative.Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.4
      }
    })
  },
  thumbOn: {
    left: OFFSET.H / 2
  },
  thumbOff: {
    left: -OFFSET.H / 2
  }
});
var _default = Switch;
exports.default = _default;
//# sourceMappingURL=index.js.map