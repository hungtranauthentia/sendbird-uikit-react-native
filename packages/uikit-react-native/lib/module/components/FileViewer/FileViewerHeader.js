import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Icon, PressBox, Text, createStyleSheet, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { truncate } from '@sendbird/uikit-utils';
const FileViewerHeader = _ref => {
  let {
    headerShown = true,
    topInset,
    onClose,
    subtitle,
    title
  } = _ref;
  const {
    palette
  } = useUIKitTheme();
  const {
    defaultHeight
  } = useHeaderStyle();
  const {
    left,
    right
  } = useSafeAreaInsets();
  if (!headerShown) return null;
  return /*#__PURE__*/React.createElement(Box, {
    style: [styles.container, {
      paddingLeft: styles.container.paddingHorizontal + left,
      paddingRight: styles.container.paddingHorizontal + right,
      paddingTop: topInset,
      height: defaultHeight + topInset,
      backgroundColor: palette.overlay01
    }]
  }, /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.75,
    onPress: onClose,
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'close',
    size: 24,
    color: palette.onBackgroundDark01
  })), /*#__PURE__*/React.createElement(Box, {
    style: styles.titleContainer
  }, /*#__PURE__*/React.createElement(Text, {
    h2: true,
    color: palette.onBackgroundDark01,
    style: styles.title,
    numberOfLines: 1
  }, truncate(title, {
    mode: 'mid',
    maxLen: 18
  })), /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: palette.onBackgroundDark01,
    numberOfLines: 1
  }, subtitle)), /*#__PURE__*/React.createElement(Box, {
    style: styles.buttonContainer
  }));
};
const styles = createStyleSheet({
  container: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  buttonContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 2
  }
});
export default FileViewerHeader;
//# sourceMappingURL=FileViewerHeader.js.map