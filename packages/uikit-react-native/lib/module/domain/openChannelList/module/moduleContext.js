import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const OpenChannelListContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: ''
  })
};
export const OpenChannelListContextsProvider = _ref => {
  let {
    children
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(OpenChannelListContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL_LIST.HEADER_TITLE
    }
  }, children));
};
//# sourceMappingURL=moduleContext.js.map