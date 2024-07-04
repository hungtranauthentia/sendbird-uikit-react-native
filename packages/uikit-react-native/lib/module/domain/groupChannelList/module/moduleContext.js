import React, { createContext, useCallback, useState } from 'react';
import { NOOP } from '@sendbird/uikit-utils';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const GroupChannelListContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: ''
  }),
  TypeSelector: /*#__PURE__*/createContext({
    headerTitle: '',
    visible: Boolean(),
    hide: NOOP,
    show: NOOP
  })
};
export const GroupChannelListContextsProvider = _ref => {
  let {
    children
  } = _ref;
  const {
    STRINGS
  } = useLocalization();

  // Type selector
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(GroupChannelListContexts.TypeSelector.Provider, {
    value: {
      headerTitle: STRINGS.GROUP_CHANNEL_LIST.TYPE_SELECTOR_HEADER_TITLE,
      visible,
      show,
      hide
    }
  }, /*#__PURE__*/React.createElement(GroupChannelListContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.GROUP_CHANNEL_LIST.HEADER_TITLE
    }
  }, children)));
};
//# sourceMappingURL=moduleContext.js.map