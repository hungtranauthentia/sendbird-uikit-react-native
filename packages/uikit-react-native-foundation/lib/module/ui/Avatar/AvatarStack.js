import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import useUIKitTheme from '../../theme/useUIKitTheme';
const DEFAULT_MAX = 3;
const DEFAULT_BORDER_WIDTH = 2;
const DEFAULT_AVATAR_GAP = -4;
const DEFAULT_AVATAR_SIZE = 26;
const DEFAULT_REMAINS_MAX = 99;
const AvatarStack = _ref => {
  let {
    children,
    containerStyle,
    styles,
    maxAvatar = DEFAULT_MAX,
    size = DEFAULT_AVATAR_SIZE,
    avatarGap = DEFAULT_AVATAR_GAP
  } = _ref;
  const {
    colors,
    palette,
    select
  } = useUIKitTheme();
  const defaultStyles = {
    borderWidth: DEFAULT_BORDER_WIDTH,
    borderColor: colors.background,
    remainsTextColor: colors.onBackground02,
    remainsBackgroundColor: select({
      light: palette.background100,
      dark: palette.background600
    })
  };
  const avatarStyles = {
    ...defaultStyles,
    ...styles
  };
  const childrenArray = React.Children.toArray(children).filter(it => /*#__PURE__*/React.isValidElement(it));
  const remains = childrenArray.length - maxAvatar;
  const shouldRenderRemains = remains > 0;
  const actualSize = size + avatarStyles.borderWidth * 2;
  const actualGap = avatarGap - avatarStyles.borderWidth;
  const renderAvatars = () => {
    return childrenArray.slice(0, maxAvatar).map((child, index) => /*#__PURE__*/React.cloneElement(child, {
      size: actualSize,
      containerStyle: {
        left: actualGap * index,
        borderWidth: avatarStyles.borderWidth,
        borderColor: avatarStyles.borderColor
      }
    }));
  };
  const renderRemainsCount = () => {
    if (!shouldRenderRemains) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: [avatarStyles, {
        left: actualGap * maxAvatar,
        width: actualSize,
        height: actualSize,
        borderRadius: actualSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: avatarStyles.remainsBackgroundColor
      }]
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        color: avatarStyles.remainsTextColor,
        fontSize: 8
      },
      caption4: true
    }, `+${Math.min(remains, DEFAULT_REMAINS_MAX)}`));
  };
  const calculateWidth = () => {
    const widthEach = actualSize + actualGap;
    const avatarCountOffset = shouldRenderRemains ? 1 : 0;
    const avatarCount = shouldRenderRemains ? maxAvatar : childrenArray.length;
    const count = avatarCount + avatarCountOffset;
    return widthEach * count + avatarStyles.borderWidth;
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, {
      left: -avatarStyles.borderWidth,
      flexDirection: 'row',
      width: calculateWidth()
    }]
  }, renderAvatars(), renderRemainsCount());
};
export default AvatarStack;
//# sourceMappingURL=AvatarStack.js.map