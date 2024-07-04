import React, { useContext } from 'react';
import { Icon, Text, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { GroupChannelSettingsContexts } from '../module/moduleContext';
const GroupChannelSettingsHeader = _ref => {
  let {
    onPressHeaderLeft
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const {
    headerTitle,
    headerRight,
    onPressHeaderRight
  } = useContext(GroupChannelSettingsContexts.Fragment);
  const {
    HeaderComponent
  } = useHeaderStyle();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: headerTitle,
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/React.createElement(Text, {
      button: true,
      color: colors.primary
    }, headerRight),
    onPressRight: onPressHeaderRight
  });
};
export default GroupChannelSettingsHeader;
//# sourceMappingURL=GroupChannelSettingsHeader.js.map