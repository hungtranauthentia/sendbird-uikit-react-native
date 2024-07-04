import React, { useContext } from 'react';
import { Icon, Text, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { ifThenOr } from '@sendbird/uikit-utils';
import { OpenChannelCreateContexts } from '../module/moduleContext';
const OpenChannelCreateHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight,
    shouldActivateHeaderRight
  } = _ref;
  const {
    headerTitle,
    headerRight
  } = useContext(OpenChannelCreateContexts.Fragment);
  const {
    HeaderComponent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const isHeaderRightActive = shouldActivateHeaderRight();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: headerTitle,
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/React.createElement(Text, {
      button: true,
      color: ifThenOr(isHeaderRightActive, colors.primary, colors.onBackground04)
    }, headerRight),
    onPressRight: ifThenOr(isHeaderRightActive, onPressHeaderRight)
  });
};
export default OpenChannelCreateHeader;
//# sourceMappingURL=OpenChannelCreateHeader.js.map