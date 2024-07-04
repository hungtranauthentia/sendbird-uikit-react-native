import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { conditionChaining } from '@sendbird/uikit-utils';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import AvatarGroup from './AvatarGroup';
import AvatarIcon from './AvatarIcon';
import AvatarStack from './AvatarStack';
const Avatar = _ref => {
  let {
    uri,
    square,
    muted = false,
    size = 56,
    containerStyle
  } = _ref;
  const {
    colors,
    palette
  } = useUIKitTheme();
  const [loadFailure, setLoadFailure] = useState(false);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width: size,
      height: size,
      borderRadius: square ? 0 : size / 2,
      backgroundColor: palette.background300
    }, containerStyle]
  }, conditionChaining([Boolean(uri) && !loadFailure], [/*#__PURE__*/React.createElement(Image, {
    onError: () => setLoadFailure(true),
    source: {
      uri
    },
    resizeMode: 'cover',
    style: StyleSheet.absoluteFill
  }), /*#__PURE__*/React.createElement(Icon, {
    icon: 'user',
    size: size / 2,
    color: colors.onBackgroundReverse01
  })]), muted && /*#__PURE__*/React.createElement(MutedOverlay, {
    size: size
  }));
};
const MutedOverlay = _ref2 => {
  let {
    size
  } = _ref2;
  const {
    palette
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, StyleSheet.absoluteFill]
  }, /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, {
      backgroundColor: palette.primary300,
      opacity: 0.5
    }]
  }), /*#__PURE__*/React.createElement(Icon, {
    color: palette.onBackgroundDark01,
    icon: 'mute',
    size: size * 0.72
  }));
};
const styles = createStyleSheet({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});
export default Object.assign(Avatar, {
  Group: AvatarGroup,
  Icon: AvatarIcon,
  Stack: AvatarStack
});
//# sourceMappingURL=index.js.map