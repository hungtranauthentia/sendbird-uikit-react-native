import React, { createContext, useState } from 'react';
import { NOOP } from '@sendbird/uikit-utils';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const OpenChannelContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    channel: {},
    setMessageToEdit: NOOP
  }),
  PubSub: /*#__PURE__*/createContext({
    publish: NOOP,
    subscribe: () => NOOP
  })
};
export const OpenChannelContextsProvider = _ref => {
  let {
    children,
    channel,
    keyboardAvoidOffset,
    openChannelPubSub
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const [messageToEdit, setMessageToEdit] = useState();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(OpenChannelContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL.HEADER_TITLE(channel),
      channel,
      keyboardAvoidOffset,
      messageToEdit,
      setMessageToEdit
    }
  }, /*#__PURE__*/React.createElement(OpenChannelContexts.PubSub.Provider, {
    value: openChannelPubSub
  }, children)));
};
//# sourceMappingURL=moduleContext.js.map