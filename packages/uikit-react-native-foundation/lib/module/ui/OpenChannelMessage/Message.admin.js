import React from 'react';
import Box from '../../components/Box';
import Text from '../../components/Text';
import useUIKitTheme from '../../theme/useUIKitTheme';
const AdminMessage = props => {
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/React.createElement(Box, {
    marginVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background
  }, /*#__PURE__*/React.createElement(Box, {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: color.enabled.adminBackground
  }, /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: colors.onBackground02
  }, props.message.message)));
};
export default AdminMessage;
//# sourceMappingURL=Message.admin.js.map