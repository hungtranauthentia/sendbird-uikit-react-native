import isSameDay from 'date-fns/isSameDay';
import React from 'react';
import { View } from 'react-native';
import { Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../hooks/useContext';
const OpenChannelMessageDateSeparator = _ref => {
  let {
    message,
    prevMessage
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const sameDay = isSameDay(message.createdAt, (prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.createdAt) ?? 0);
  if (sameDay) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.view, {
      backgroundColor: colors.ui.dateSeparator.default.none.background
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    color: colors.ui.dateSeparator.default.none.text
  }, STRINGS.OPEN_CHANNEL.LIST_DATE_SEPARATOR(new Date(message.createdAt)))));
};
const styles = createStyleSheet({
  container: {
    alignItems: 'center',
    marginVertical: 16
  },
  view: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10
  }
});
export default OpenChannelMessageDateSeparator;
//# sourceMappingURL=OpenChannelMessageDateSeparator.js.map