import React from 'react';
import { Avatar, Box, Icon, PressBox, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getFileIconFromMessage, isVoiceMessage, useIIFE } from '@sendbird/uikit-utils';
import { useLocalization } from '../hooks/useContext';
const MessageSearchResultItem = _ref => {
  let {
    onPress,
    message
  } = _ref;
  const {
    colors,
    select,
    palette
  } = useUIKitTheme();
  const {
    STRINGS
  } = useLocalization();
  const fileIcon = useIIFE(() => {
    if (!(message !== null && message !== void 0 && message.isFileMessage())) return undefined;
    if (isVoiceMessage(message)) return undefined;
    return getFileIconFromMessage(message);
  });
  return /*#__PURE__*/React.createElement(PressBox, {
    onPress: onPress
  }, /*#__PURE__*/React.createElement(Box, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: styles.avatarSize.width,
    uri: getSenderProfile(message),
    containerStyle: styles.avatar
  }), /*#__PURE__*/React.createElement(Box, {
    flex: 1,
    paddingRight: 16
  }, /*#__PURE__*/React.createElement(Box, {
    style: styles.titleLine
  }, /*#__PURE__*/React.createElement(Box, {
    flex: 1,
    marginRight: 4,
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(Text, {
    subtitle2: true,
    color: colors.onBackground01,
    numberOfLines: 1
  }, STRINGS.MESSAGE_SEARCH.SEARCH_RESULT_ITEM_TITLE(message))), /*#__PURE__*/React.createElement(Box, {
    paddingTop: 2
  }, /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: colors.onBackground02
  }, STRINGS.MESSAGE_SEARCH.SEARCH_RESULT_ITEM_TITLE_CAPTION(message)))), /*#__PURE__*/React.createElement(Box, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Box, {
    alignItems: 'center',
    flexDirection: 'row'
  }, fileIcon && /*#__PURE__*/React.createElement(Icon, {
    icon: fileIcon,
    size: 18,
    color: colors.onBackground02,
    containerStyle: [styles.bodyIcon, {
      backgroundColor: select({
        light: palette.background100,
        dark: palette.background500
      })
    }]
  }), /*#__PURE__*/React.createElement(Text, {
    body3: true,
    numberOfLines: fileIcon ? 1 : 2,
    ellipsizeMode: fileIcon ? 'middle' : 'tail',
    style: styles.bodyText,
    color: colors.onBackground03
  }, STRINGS.MESSAGE_SEARCH.SEARCH_RESULT_ITEM_BODY(message)))), /*#__PURE__*/React.createElement(Box, {
    style: styles.separator,
    backgroundColor: colors.onBackground04
  }))));
};
function getSenderProfile(message) {
  if (message.isUserMessage() || message.isFileMessage()) {
    return message.sender.profileUrl;
  } else {
    return undefined;
  }
}
const styles = createStyleSheet({
  container: {
    height: 76,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    marginHorizontal: 16
  },
  avatarSize: {
    width: 56
  },
  titleLine: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 4
  },
  bodyIcon: {
    borderRadius: 8,
    width: 26,
    height: 26,
    marginRight: 4
  },
  bodyText: {
    flex: 1,
    lineHeight: 16
  },
  separator: {
    position: 'absolute',
    left: 0,
    right: -16,
    bottom: 0,
    height: 1
  }
});
export default MessageSearchResultItem;
//# sourceMappingURL=MessageSearchResultItem.js.map