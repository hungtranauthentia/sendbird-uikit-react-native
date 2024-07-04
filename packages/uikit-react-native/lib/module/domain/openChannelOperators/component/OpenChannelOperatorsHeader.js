import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { OpenChannelOperatorsContexts } from '../module/moduleContext';
const OpenChannelOperatorsHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight
  } = _ref;
  const {
    headerTitle
  } = useContext(OpenChannelOperatorsContexts.Fragment);
  const {
    HeaderComponent
  } = useHeaderStyle();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: headerTitle,
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/React.createElement(Icon, {
      icon: 'plus'
    }),
    onPressRight: onPressHeaderRight
  });
};
export default OpenChannelOperatorsHeader;
//# sourceMappingURL=OpenChannelOperatorsHeader.js.map