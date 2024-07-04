"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Image = _interopRequireDefault(require("../../components/Image"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Badge = _interopRequireDefault(require("../Badge"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelPreview;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: color.default.none.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.coverContainer
  }, (0, _uikitUtils.conditionChaining)([Boolean(customCover)], [customCover, /*#__PURE__*/_react.default.createElement(_Image.default, {
    resizeMode: 'cover',
    style: [styles.channelCover, {
      backgroundColor: color.default.none.coverBackground
    }],
    source: {
      uri: coverUrl
    }
  })])), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.rightSection
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.rightTopSection
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.channelInfoContainer
  }, broadcast && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    size: 16,
    icon: 'broadcast',
    color: colors.secondary,
    containerStyle: styles.channelInfoBroadcast
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    numberOfLines: 1,
    subtitle1: true,
    style: styles.channelInfoTitle,
    color: color.default.none.textTitle
  }, title), Boolean(memberCount) && /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption1: true,
    style: styles.channelInfoMemberCount,
    color: color.default.none.memberCount
  }, memberCount), frozen && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    size: 16,
    icon: 'freeze',
    color: colors.primary,
    containerStyle: styles.channelInfoFrozen
  }), notificationOff && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    size: 16,
    icon: 'notifications-off-filled',
    color: colors.onBackground03
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleCaptionContainer
  }, titleCaptionLeft, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption2: true,
    color: color.default.none.textTitleCaption,
    style: styles.titleCaptionText
  }, titleCaption))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.rightBottomSection
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.body
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bodyWrapper
  }, bodyIcon && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    size: 18,
    icon: bodyIcon,
    color: color.default.none.bodyIcon,
    containerStyle: [styles.bodyIcon, {
      backgroundColor: colors.ui.groupChannelPreview.default.none.bodyIconBackground
    }]
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    body3: true,
    numberOfLines: 1,
    ellipsizeMode: bodyIcon ? 'middle' : 'tail',
    style: styles.bodyText,
    color: color.default.none.textBody
  }, body))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.unreadContainer
  }, mentioned && /*#__PURE__*/_react.default.createElement(_Text.default, {
    h2: true,
    color: colors.ui.badge.default.none.background,
    style: styles.unreadMention
  }, mentionTrigger), badgeCount > 0 && /*#__PURE__*/_react.default.createElement(_Badge.default, {
    count: badgeCount,
    maxCount: maxBadgeCount
  }))), /*#__PURE__*/_react.default.createElement(Separator, {
    color: color.default.none.separator
  })));
};
const Separator = _ref2 => {
  let {
    color
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.separator, {
      backgroundColor: color
    }]
  });
};
const styles = (0, _createStyleSheet.default)({
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
var _default = GroupChannelPreview;
exports.default = _default;
//# sourceMappingURL=index.js.map