import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from '../../components/Icon';
import useUIKitTheme from '../../theme/useUIKitTheme';
const LoadingSpinner = _ref => {
  let {
    size = 24,
    color,
    style
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Rotate, {
    style: style
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'spinner',
    size: size,
    color: color ?? colors.primary
  }));
};
const useLoopAnimated = function (duration) {
  let useNativeDriver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const animated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(animated, {
      toValue: 1,
      duration,
      useNativeDriver,
      easing: Easing.inOut(Easing.linear)
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
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [style, {
      transform: [{
        rotate
      }]
    }]
  }, children);
};
export default LoadingSpinner;
//# sourceMappingURL=index.js.map