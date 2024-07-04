import React from 'react';
import { Placeholder } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../hooks/useContext';
const TypedPlaceholder = _ref => {
  let {
    type,
    onPressRetry
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  switch (type) {
    case 'no-banned-users':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'ban',
        message: STRINGS.PLACEHOLDER.NO_BANNED_USERS
      });
    case 'no-channels':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'chat',
        message: STRINGS.PLACEHOLDER.NO_CHANNELS
      });
    case 'no-messages':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'message',
        message: STRINGS.PLACEHOLDER.NO_MESSAGES
      });
    case 'no-muted-members':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'mute',
        message: STRINGS.PLACEHOLDER.NO_MUTED_MEMBERS
      });
    case 'no-muted-participants':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'mute',
        message: STRINGS.PLACEHOLDER.NO_MUTED_PARTICIPANTS
      });
    case 'no-results-found':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'search',
        message: STRINGS.PLACEHOLDER.NO_RESULTS_FOUND
      });
    case 'no-users':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'members',
        message: STRINGS.PLACEHOLDER.NO_USERS
      });
    case 'error-wrong':
      return /*#__PURE__*/React.createElement(Placeholder, {
        icon: 'error',
        message: STRINGS.PLACEHOLDER.ERROR.MESSAGE,
        errorRetryLabel: STRINGS.PLACEHOLDER.ERROR.RETRY_LABEL,
        onPressRetry: onPressRetry
      });
    case 'loading':
      return /*#__PURE__*/React.createElement(Placeholder, {
        loading: true,
        icon: 'spinner'
      });
  }
};
export default TypedPlaceholder;
//# sourceMappingURL=TypedPlaceholder.js.map