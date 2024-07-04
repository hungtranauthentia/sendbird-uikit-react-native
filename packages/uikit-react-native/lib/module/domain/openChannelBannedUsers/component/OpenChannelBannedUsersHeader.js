import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { OpenChannelBannedUsersContexts } from '../module/moduleContext';
const OpenChannelBannedUsersHeader = _ref => {
  let {
    onPressHeaderLeft
  } = _ref;
  const {
    headerTitle
  } = useContext(OpenChannelBannedUsersContexts.Fragment);
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
export default OpenChannelBannedUsersHeader;
//# sourceMappingURL=OpenChannelBannedUsersHeader.js.map