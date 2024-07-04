import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { GroupChannelNotificationsContexts } from '../module/moduleContext';
const GroupChannelNotificationsHeader = _ref => {
  let {
    onPressHeaderLeft
  } = _ref;
  const {
    headerTitle
  } = useContext(GroupChannelNotificationsContexts.Fragment);
  const {
    HeaderComponent
  } = useHeaderStyle();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: headerTitle,
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft
  });
};
export default GroupChannelNotificationsHeader;
//# sourceMappingURL=GroupChannelNotificationsHeader.js.map