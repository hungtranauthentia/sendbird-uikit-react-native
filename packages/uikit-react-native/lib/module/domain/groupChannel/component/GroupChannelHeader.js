import React, { useContext } from 'react';
import { View } from 'react-native';
import { Header, Icon, createStyleSheet, useHeaderStyle } from '@sendbird/uikit-react-native-foundation';
import ChannelCover from '../../../components/ChannelCover';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
import { TypingIndicatorType } from '../../../types';
import { GroupChannelContexts } from '../module/moduleContext';
const GroupChannelHeader = _ref => {
  let {
    shouldHideRight,
    onPressHeaderLeft,
    onPressHeaderRight
  } = _ref;
  const {
    sbOptions
  } = useSendbirdChat();
  const {
    headerTitle,
    channel
  } = useContext(GroupChannelContexts.Fragment);
  const {
    typingUsers
  } = useContext(GroupChannelContexts.TypingIndicator);
  const {
    STRINGS
  } = useLocalization();
  const {
    HeaderComponent
  } = useHeaderStyle();
  const renderSubtitle = () => {
    const subtitle = STRINGS.LABELS.TYPING_INDICATOR_TYPINGS(typingUsers);
    if (!subtitle) return null;
    if (!sbOptions.uikit.groupChannel.channel.enableTypingIndicator) return null;
    if (!sbOptions.uikit.groupChannel.channel.typingIndicatorTypes.has(TypingIndicatorType.Text)) return null;
    return /*#__PURE__*/React.createElement(Header.Subtitle, {
      style: styles.subtitle
    }, subtitle);
  };
  const isHidden = shouldHideRight();
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    clearTitleMargin: true,
    title: /*#__PURE__*/React.createElement(View, {
      style: styles.titleContainer
    }, /*#__PURE__*/React.createElement(ChannelCover, {
      channel: channel,
      size: 34,
      containerStyle: styles.avatarGroup
    }), /*#__PURE__*/React.createElement(View, {
      style: {
        flexShrink: 1
      }
    }, /*#__PURE__*/React.createElement(Header.Title, {
      h2: true
    }, headerTitle), renderSubtitle())),
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: isHidden ? null : /*#__PURE__*/React.createElement(Icon, {
      icon: 'info'
    }),
    onPressRight: isHidden ? undefined : onPressHeaderRight
  });
};
const styles = createStyleSheet({
  titleContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarGroup: {
    marginRight: 8
  },
  subtitle: {
    marginTop: 2
  }
});
export default GroupChannelHeader;
//# sourceMappingURL=GroupChannelHeader.js.map