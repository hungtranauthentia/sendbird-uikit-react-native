"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _constants = require("../../constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelMessageFocusAnimation = props => {
  const isFirstMount = (0, _uikitUtils.useIsFirstMount)();
  const translateY = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    if (props.focused) {
      const delay = _constants.MESSAGE_FOCUS_ANIMATION_DELAY + (isFirstMount ? _constants.MESSAGE_SEARCH_SAFE_SCROLL_DELAY : 0);
      setTimeout(() => {
        _reactNative.Animated.sequence([{
          toValue: -10,
          duration: 500
        }, {
          toValue: 0,
          duration: 100
        }, {
          toValue: -10,
          duration: 200
        }, {
          toValue: 0,
          duration: 100
        }].map(value => _reactNative.Animated.timing(translateY, {
          ...value,
          useNativeDriver: true,
          easing: _reactNative.Easing.inOut(_reactNative.Easing.ease)
        }))).start();
      }, delay);
    }
  }, [props.focused]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        translateY
      }]
    }
  }, props.children);
};
var _default = GroupChannelMessageFocusAnimation;
exports.default = _default;
//# sourceMappingURL=GroupChannelMessageFocusAnimation.js.map