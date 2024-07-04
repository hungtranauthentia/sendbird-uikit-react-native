import React, { createContext } from 'react';
import ProviderLayout from '../../../components/ProviderLayout';
import { useLocalization } from '../../../hooks/useContext';
export const GroupChannelModerationContexts = {
  Fragment: /*#__PURE__*/createContext({
    headerTitle: '',
    channel: {}
  })
};
export const GroupChannelModerationContextsProvider = _ref => {
  let {
    children,
    channel
  } = _ref;
  // const [visible, setVisible] = useState(false);

  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(ProviderLayout, null, /*#__PURE__*/React.createElement(GroupChannelModerationContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.GROUP_CHANNEL_MODERATION.HEADER_TITLE,
      channel
    }
  }, children));
};
//# sourceMappingURL=moduleContext.js.map