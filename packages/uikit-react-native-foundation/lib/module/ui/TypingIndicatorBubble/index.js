import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Box from '../../components/Box';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Avatar from '../Avatar';
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
  } = useUIKitTheme();
  if (typingUsers.length === 0) return null;
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    style: containerStyle
  }, /*#__PURE__*/React.createElement(Avatar.Stack, {
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
  }, typingUsers.map((user, index) => /*#__PURE__*/React.createElement(Avatar, {
    key: index,
    uri: user.profileUrl
  }))), /*#__PURE__*/React.createElement(TypingDots, {
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
  const animation = useRef(new Animated.Value(0)).current;
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
  useEffect(() => {
    const animated = Animated.loop(Animated.timing(animation, {
      toValue: 1.4,
      duration: 1400,
      easing: Easing.linear,
      useNativeDriver: true
    }));
    animated.start();
    return () => animated.reset();
  }, []);
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 34,
    backgroundColor: dotColor
  }, dots.map((_ref4, index) => {
    let [scale, opacity] = _ref4;
    return /*#__PURE__*/React.createElement(Animated.View, {
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
const styles = createStyleSheet({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  }
});
export default TypingIndicatorBubble;
//# sourceMappingURL=index.js.map