import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const OpenChannelModerationContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    channel: {}
  })
};
export const OpenChannelModerationContextsProvider = _ref => {
  let {
    children,
    channel
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(OpenChannelModerationContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL_MODERATION.HEADER_TITLE,
      channel
    }
  }, children));
};
//# sourceMappingURL=moduleContext.js.map