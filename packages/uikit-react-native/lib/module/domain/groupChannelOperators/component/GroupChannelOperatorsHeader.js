import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { GroupChannelOperatorsContexts } from '../module/moduleContext';
const GroupChannelOperatorsHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight
  } = _ref;
  const {
    headerTitle
  } = useContext(GroupChannelOperatorsContexts.Fragment);
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
export default GroupChannelOperatorsHeader;
//# sourceMappingURL=GroupChannelOperatorsHeader.js.map