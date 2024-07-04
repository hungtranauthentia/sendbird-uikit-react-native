import React, { useContext } from 'react';
import { Icon, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { OpenChannelMutedParticipantsContexts } from '../module/moduleContext';
const OpenChannelMutedParticipantsHeader = _ref => {
  let {
    onPressHeaderLeft
  } = _ref;
  const {
    headerTitle
  } = useContext(OpenChannelMutedParticipantsContexts.Fragment);
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
export default OpenChannelMutedParticipantsHeader;
//# sourceMappingURL=OpenChannelMutedParticipantsHeader.js.map