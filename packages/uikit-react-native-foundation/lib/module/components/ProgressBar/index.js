import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { NOOP } from '@sendbird/uikit-utils';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Box from '../Box';
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
  } = useUIKitTheme();
  const uiColors = {
    track: trackColor ?? colors.primary,
    bar: barColor ?? colors.onBackground01
  };
  const progress = useRef(new Animated.Value(0)).current;
  const percent = current / total;
  const stopped = percent === 0;
  useEffect(() => {
    if (!Number.isNaN(percent)) {
      const animation = Animated.timing(progress, {
        toValue: stopped ? 0 : percent,
        duration: stopped ? 0 : 100,
        useNativeDriver: false,
        easing: Easing.linear
      });
      animation.start();
      return () => animation.stop();
    }
    return NOOP;
  }, [percent]);
  return /*#__PURE__*/React.createElement(Box, {
    height: 36,
    flexDirection: 'row',
    backgroundColor: uiColors.track,
    alignItems: 'center',
    overflow: 'hidden',
    style: style
  }, /*#__PURE__*/React.createElement(Animated.View, {
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
  }), /*#__PURE__*/React.createElement(Box, {
    style: StyleSheet.absoluteFill
  }, overlay));
};
export default ProgressBar;
//# sourceMappingURL=index.js.map