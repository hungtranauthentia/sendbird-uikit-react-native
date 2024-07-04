import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const OpenChannelCreateContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    headerRight: ''
  })
};
export const OpenChannelCreateContextsProvider = _ref => {
  let {
    children
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(OpenChannelCreateContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL_CREATE.HEADER_TITLE,
      headerRight: STRINGS.OPEN_CHANNEL_CREATE.HEADER_RIGHT
    }
  }, children));
};
//# sourceMappingURL=moduleContext.js.map