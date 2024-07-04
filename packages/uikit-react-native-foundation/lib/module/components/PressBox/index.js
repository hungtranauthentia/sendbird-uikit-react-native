function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { isFunction } from '@sendbird/uikit-utils';
export const DEFAULT_LONG_PRESS_DELAY = 350;
const PressBox = props => {
  if (props.activeOpacity && props.activeOpacity < 1) return /*#__PURE__*/React.createElement(PressBoxWithTouchableOpacity, props);
  return /*#__PURE__*/React.createElement(PressBoxWithPressable, props);
};
const PressBoxWithPressable = _ref => {
  let {
    children,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(Pressable, _extends({
    disabled: !props.onPress && !props.onLongPress,
    delayLongPress: DEFAULT_LONG_PRESS_DELAY
  }, props), state => isFunction(children) ? children(state) : children);
};
const PressBoxWithTouchableOpacity = _ref2 => {
  let {
    children,
    style,
    ...props
  } = _ref2;
  const [pressed, setPressed] = useState(false);
  const state = {
    pressed
  };
  return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
    disabled: !props.onPress && !props.onLongPress,
    delayLongPress: DEFAULT_LONG_PRESS_DELAY,
    style: isFunction(style) ? style(state) : style,
    onPressIn: () => setPressed(true),
    onPressOut: () => setPressed(false)
  }, props), isFunction(children) ? children(state) : children);
};
export default PressBox;
//# sourceMappingURL=index.js.map