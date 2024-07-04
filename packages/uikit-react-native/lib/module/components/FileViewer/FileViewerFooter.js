import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Icon, PressBox, createStyleSheet, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
const FileViewerFooter = _ref => {
  let {
    bottomInset,
    deleteShown,
    onPressDelete,
    onPressDownload
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
  return /*#__PURE__*/React.createElement(Box, {
    style: [styles.container, {
      paddingLeft: styles.container.paddingHorizontal + left,
      paddingRight: styles.container.paddingHorizontal + right,
      paddingBottom: bottomInset,
      height: defaultHeight + bottomInset,
      backgroundColor: palette.overlay01
    }]
  }, /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.75,
    onPress: onPressDownload,
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'download',
    size: 24,
    color: palette.onBackgroundDark01
  })), /*#__PURE__*/React.createElement(Box, {
    style: styles.titleContainer
  }), /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.75,
    onPress: onPressDelete,
    style: styles.buttonContainer,
    disabled: !deleteShown
  }, deleteShown && /*#__PURE__*/React.createElement(Icon, {
    icon: 'delete',
    size: 24,
    color: palette.onBackgroundDark01
  })));
};
const styles = createStyleSheet({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
  }
});
export default FileViewerFooter;
//# sourceMappingURL=FileViewerFooter.js.map