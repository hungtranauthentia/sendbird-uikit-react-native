import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { OpenChannelListContexts } from '../module/moduleContext';
const OpenChannelListHeader = _ref => {
  let {
    onPressHeaderRight
  } = _ref;
  const {
    headerTitle
  } = useContext(OpenChannelListContexts.Fragment);
  const {
    HeaderComponent
  } = useHeaderStyle();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: headerTitle,
    right: /*#__PURE__*/React.createElement(Icon, {
      icon: 'create'
    }),
    onPressRight: onPressHeaderRight
  });
};
export default OpenChannelListHeader;
//# sourceMappingURL=OpenChannelListHeader.js.map