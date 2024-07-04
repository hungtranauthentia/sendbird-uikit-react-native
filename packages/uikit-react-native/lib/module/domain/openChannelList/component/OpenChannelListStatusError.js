import React from 'react';
import { Box } from '@sendbird/uikit-react-native-foundation';
import TypedPlaceholder from '../../../components/TypedPlaceholder';
const OpenChannelListStatusError = _ref => {
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
export default OpenChannelListStatusError;
//# sourceMappingURL=OpenChannelListStatusError.js.map