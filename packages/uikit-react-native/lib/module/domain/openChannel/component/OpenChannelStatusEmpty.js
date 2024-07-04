import React from 'react';
import { StyleSheet, View } from 'react-native';
import TypedPlaceholder from '../../../components/TypedPlaceholder';
const OpenChannelStatusEmpty = () => {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TypedPlaceholder, {
    type: 'no-messages'
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default OpenChannelStatusEmpty;
//# sourceMappingURL=OpenChannelStatusEmpty.js.map