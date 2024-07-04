import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { GroupChannelListContexts } from '../module/moduleContext';
const GroupChannelListHeader = _ => {
  const fragment = useContext(GroupChannelListContexts.Fragment);
  const typeSelector = useContext(GroupChannelListContexts.TypeSelector);
  const {
    HeaderComponent
  } = useHeaderStyle();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: fragment.headerTitle,
    right: /*#__PURE__*/React.createElement(Icon, {
      icon: 'create'
    }),
    onPressRight: typeSelector.show
  });
};
export default GroupChannelListHeader;
//# sourceMappingURL=GroupChannelListHeader.js.map