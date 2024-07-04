"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_LONG_PRESS_DELAY = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DEFAULT_LONG_PRESS_DELAY = 350;
exports.DEFAULT_LONG_PRESS_DELAY = DEFAULT_LONG_PRESS_DELAY;
const PressBox = props => {
  if (props.activeOpacity && props.activeOpacity < 1) return /*#__PURE__*/React.createElement(PressBoxWithTouchableOpacity, props);
  return /*#__PURE__*/React.createElement(PressBoxWithPressable, props);
};
const PressBoxWithPressable = _ref => {
  let {
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, _extends({
    disabled: !props.onPress && !props.onLongPress,
    delayLongPress: DEFAULT_LONG_PRESS_DELAY
  }, props), state => (0, _uikitUtils.isFunction)(children) ? children(state) : children);
};
const PressBoxWithTouchableOpacity = _ref2 => {
  let {
    children,
    style,
    ...props
  } = _ref2;
  const [pressed, setPressed] = (0, React.useState)(false);
  const state = {
    pressed
  };
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, _extends({
    disabled: !props.onPress && !props.onLongPress,
    delayLongPress: DEFAULT_LONG_PRESS_DELAY,
    style: (0, _uikitUtils.isFunction)(style) ? style(state) : style,
    onPressIn: () => setPressed(true),
    onPressOut: () => setPressed(false)
  }, props), (0, _uikitUtils.isFunction)(children) ? children(state) : children);
};
var _default = PressBox;
exports.default = _default;
//# sourceMappingURL=index.js.map