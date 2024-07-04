import React from 'react';
import { View } from 'react-native';
import { conditionChaining } from '@sendbird/uikit-utils';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Badge from '../Badge';
const GroupChannelPreview = _ref => {
  let {
    customCover,
    coverUrl,
    memberCount,
    badgeCount,
    maxBadgeCount,
    body,
    bodyIcon,
    title,
    titleCaption,
    titleCaptionLeft,
    frozen,
    notificationOff,
    broadcast,
    mentioned,
    mentionTrigger = '@'
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelPreview;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: color.default.none.background
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.coverContainer
  }, conditionChaining([Boolean(customCover)], [customCover, /*#__PURE__*/React.createElement(Image, {
    resizeMode: 'cover',
    style: [styles.channelCover, {
      backgroundColor: color.default.none.coverBackground
    }],
    source: {
      uri: coverUrl
    }
  })])), /*#__PURE__*/React.createElement(View, {
    style: styles.rightSection
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.rightTopSection
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.channelInfoContainer
  }, broadcast && /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    icon: 'broadcast',
    color: colors.secondary,
    containerStyle: styles.channelInfoBroadcast
  }), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    subtitle1: true,
    style: styles.channelInfoTitle,
    color: color.default.none.textTitle
  }, title), Boolean(memberCount) && /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    style: styles.channelInfoMemberCount,
    color: color.default.none.memberCount
  }, memberCount), frozen && /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    icon: 'freeze',
    color: colors.primary,
    containerStyle: styles.channelInfoFrozen
  }), notificationOff && /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    icon: 'notifications-off-filled',
    color: colors.onBackground03
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.titleCaptionContainer
  }, titleCaptionLeft, /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: color.default.none.textTitleCaption,
    style: styles.titleCaptionText
  }, titleCaption))), /*#__PURE__*/React.createElement(View, {
    style: styles.rightBottomSection
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.body
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.bodyWrapper
  }, bodyIcon && /*#__PURE__*/React.createElement(Icon, {
    size: 18,
    icon: bodyIcon,
    color: color.default.none.bodyIcon,
    containerStyle: [styles.bodyIcon, {
      backgroundColor: colors.ui.groupChannelPreview.default.none.bodyIconBackground
    }]
  }), /*#__PURE__*/React.createElement(Text, {
    body3: true,
    numberOfLines: 1,
    ellipsizeMode: bodyIcon ? 'middle' : 'tail',
    style: styles.bodyText,
    color: color.default.none.textBody
  }, body))), /*#__PURE__*/React.createElement(View, {
    style: styles.unreadContainer
  }, mentioned && /*#__PURE__*/React.createElement(Text, {
    h2: true,
    color: colors.ui.badge.default.none.background,
    style: styles.unreadMention
  }, mentionTrigger), badgeCount > 0 && /*#__PURE__*/React.createElement(Badge, {
    count: badgeCount,
    maxCount: maxBadgeCount
  }))), /*#__PURE__*/React.createElement(Separator, {
    color: color.default.none.separator
  })));
};
const Separator = _ref2 => {
  let {
    color
  } = _ref2;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.separator, {
      backgroundColor: color
    }]
  });
};
const styles = createStyleSheet({
  container: {
    height: 76,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coverContainer: {
    marginLeft: 16,
    marginRight: 16
  },
  channelCover: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  rightSection: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 16
  },
  rightTopSection: {
    flexDirection: 'row',
    marginBottom: 4
  },
  channelInfoContainer: {
    flex: 1,
    marginRight: 4,
    alignItems: 'center',
    flexDirection: 'row'
  },
  channelInfoBroadcast: {
    marginRight: 4
  },
  channelInfoTitle: {
    flexShrink: 1,
    marginRight: 4
  },
  channelInfoMemberCount: {
    paddingTop: 2,
    marginRight: 4
  },
  channelInfoFrozen: {
    marginRight: 4
  },
  titleCaptionContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: 4
  },
  titleCaptionText: {
    marginTop: 2
  },
  rightBottomSection: {
    flex: 1,
    height: '100%',
    flexDirection: 'row'
  },
  body: {
    marginRight: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  bodyWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyText: {
    flex: 1
  },
  bodyIcon: {
    borderRadius: 8,
    width: 26,
    height: 26,
    marginRight: 4
  },
  unreadContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  unreadMention: {
    marginRight: 4
  },
  separator: {
    position: 'absolute',
    left: 0,
    right: -16,
    bottom: 0,
    height: 1
  }
});
export default GroupChannelPreview;
//# sourceMappingURL=index.js.map