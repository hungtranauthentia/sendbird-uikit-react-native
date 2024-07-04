import React from 'react';
import Box from '../../components/Box';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const AdminMessage = props => {
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Box, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: colors.onBackground02,
    style: styles.text
  }, props.message.message));
};
const styles = createStyleSheet({
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
});
export default AdminMessage;
//# sourceMappingURL=Message.admin.js.map