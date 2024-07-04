import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const OpenChannelBannedUsersContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    channel: {}
  })
};
export const OpenChannelBannedUsersContextsProvider = _ref => {
  let {
    channel,
    children
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(OpenChannelBannedUsersContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL_BANNED_USERS.HEADER_TITLE,
      channel
    }
  }, children));
};
//# sourceMappingURL=moduleContext.js.map