import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { OpenChannelModerationContexts } from '../module/moduleContext';
const OpenChannelModerationHeader = _ref => {
  let {
    onPressHeaderLeft
  } = _ref;
  const {
    headerTitle
  } = useContext(OpenChannelModerationContexts.Fragment);
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
export default OpenChannelModerationHeader;
//# sourceMappingURL=OpenChannelModerationHeader.js.map