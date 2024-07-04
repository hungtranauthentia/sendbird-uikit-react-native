import React from 'react';
import { StyleSheet, View } from 'react-native';
import TypedPlaceholder from '../../../components/TypedPlaceholder';
const GroupChannelMutedMembersStatusError = _ref => {
  let {
    onPressRetry
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TypedPlaceholder, {
    type: 'error-wrong',
    onPressRetry: onPressRetry
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default GroupChannelMutedMembersStatusError;
//# sourceMappingURL=GroupChannelMutedMembersStatusError.js.map