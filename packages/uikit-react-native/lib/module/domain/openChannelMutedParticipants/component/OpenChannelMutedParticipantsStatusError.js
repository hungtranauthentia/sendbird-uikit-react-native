import React from 'react';
import { Box } from '@sendbird/uikit-react-native-foundation';
import TypedPlaceholder from '../../../components/TypedPlaceholder';
const OpenChannelMutedParticipantsStatusError = _ref => {
  let {
    onPressRetry
  } = _ref;
  return /*#__PURE__*/React.createElement(Box, {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(TypedPlaceholder, {
    type: 'error-wrong',
    onPressRetry: onPressRetry
  }));
};
export default OpenChannelMutedParticipantsStatusError;
//# sourceMappingURL=OpenChannelMutedParticipantsStatusError.js.map