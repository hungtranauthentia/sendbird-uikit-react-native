import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const OpenChannelMutedParticipantsContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    channel: {}
  })
};
export const OpenChannelMutedParticipantsContextsProvider = _ref => {
  let {
    children,
    channel
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsContexts.Fragment.Provider, {
    value: {
      channel,
      headerTitle: STRINGS.OPEN_CHANNEL_MUTED_PARTICIPANTS.HEADER_TITLE
    }
  }, children));
};
//# sourceMappingURL=moduleContext.js.map