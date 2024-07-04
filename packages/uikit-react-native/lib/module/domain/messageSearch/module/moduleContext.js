import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
export const MessageSearchContexts = {
  Fragment: /*#__PURE__*/createContext(null)
};
export const MessageSearchContextsProvider = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(MessageSearchContexts.Fragment.Provider, {
    value: null
  }, children));
};
//# sourceMappingURL=moduleContext.js.map