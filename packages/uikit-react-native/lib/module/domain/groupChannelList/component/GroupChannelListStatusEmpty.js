import React from 'react';
import { StyleSheet, View } from 'react-native';
import TypedPlaceholder from '../../../components/TypedPlaceholder';
const GroupChannelListStatusEmpty = () => {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TypedPlaceholder, {
    type: 'no-channels'
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default GroupChannelListStatusEmpty;
//# sourceMappingURL=GroupChannelListStatusEmpty.js.map