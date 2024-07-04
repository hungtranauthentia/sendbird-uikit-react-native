import React, { useContext } from 'react';
import { Box, Header, Icon, createStyleSheet, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../..//hooks/useContext';
import ChannelCover from '../../../components/ChannelCover';
import { OpenChannelContexts } from '../module/moduleContext';
const OpenChannelHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight,
    rightIconName
  } = _ref;
  const {
    headerTitle,
    channel
  } = useContext(OpenChannelContexts.Fragment);
  const {
    HeaderComponent
  } = useHeaderStyle();
  const {
    STRINGS
  } = useLocalization();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    clearTitleMargin: true,
    title: /*#__PURE__*/React.createElement(Box, {
      flexDirection: 'row',
      alignItems: 'center',
      style: styles.titleContainer
    }, /*#__PURE__*/React.createElement(ChannelCover, {
      channel: channel,
      size: 34,
      containerStyle: styles.avatarGroup
    }), /*#__PURE__*/React.createElement(Box, {
      flexShrink: 1
    }, /*#__PURE__*/React.createElement(Header.Title, {
      h2: true
    }, headerTitle), /*#__PURE__*/React.createElement(Header.Subtitle, {
      style: styles.subtitle
    }, STRINGS.OPEN_CHANNEL.HEADER_SUBTITLE(channel)))),
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/React.createElement(Icon, {
      icon: rightIconName
    }),
    onPressRight: onPressHeaderRight
  });
};
const styles = createStyleSheet({
  titleContainer: {
    maxWidth: '100%'
  },
  avatarGroup: {
    marginRight: 8
  },
  subtitle: {
    marginTop: 2
  }
});
export default /*#__PURE__*/React.memo(OpenChannelHeader);
//# sourceMappingURL=OpenChannelHeader.js.map