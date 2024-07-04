"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../../hooks/useContext");
var _useKeyboardStatus = _interopRequireDefault(require("../../../hooks/useKeyboardStatus"));
var _useMentionSuggestion = _interopRequireDefault(require("../../../hooks/useMentionSuggestion"));
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelSuggestedMentionList = _ref => {
  let {
    text,
    selection,
    inputHeight,
    bottomInset,
    onPressToMention,
    mentionedUsers
  } = _ref;
  const {
    width: screenWidth,
    height: screenHeight
  } = (0, _reactNative.useWindowDimensions)();
  const {
    channel
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.Fragment);
  const {
    sdk,
    mentionManager
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    topInset
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const keyboard = (0, _useKeyboardStatus.default)();
  const {
    members,
    reset,
    searchStringRange,
    searchLimited
  } = (0, _useMentionSuggestion.default)({
    sdk,
    text,
    selection,
    channel,
    mentionedUsers
  });
  const isLandscape = screenWidth > screenHeight;
  const isShortened = isLandscape && keyboard.visible;
  const canRenderMembers = members.length > 0;
  const maxHeight = isShortened ? screenHeight - (topInset + inputHeight + keyboard.height) : styles.suggestion.height;
  const renderLimitGuide = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.searchLimited, {
        borderTopColor: colors.onBackground04
      }]
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'info',
      size: 20,
      containerStyle: {
        marginRight: 4
      },
      color: colors.onBackground02
    }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
      body3: true,
      color: colors.onBackground02
    }, STRINGS.GROUP_CHANNEL.MENTION_LIMITED(mentionManager.config.mentionLimit)));
  };
  const renderMembers = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, members.map(member => {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
        onPress: () => {
          onPressToMention(member, searchStringRange);
          reset();
        },
        key: member.userId,
        style: styles.userContainer
      }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
        size: 28,
        uri: member.profileUrl,
        containerStyle: styles.userAvatar
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.userInfo
      }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
        body2: true,
        color: colors.onBackground01,
        numberOfLines: 1,
        style: styles.userNickname
      }, member.nickname || STRINGS.LABELS.USER_NO_NAME), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
        body3: true,
        color: colors.onBackground03,
        numberOfLines: 1,
        style: styles.userId
      }, member.userId), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Divider, {
        style: {
          position: 'absolute',
          bottom: 0
        }
      })));
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: reset,
    pointerEvents: canRenderMembers ? 'auto' : 'none',
    style: [styles.container, {
      bottom: inputHeight + bottomInset
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    bounces: false,
    keyboardDismissMode: 'none',
    keyboardShouldPersistTaps: 'always',
    style: [styles.scrollView, {
      maxHeight,
      backgroundColor: colors.background,
      bottom: keyboard.bottomSpace
    }, canRenderMembers && {
      borderTopWidth: 1,
      borderTopColor: colors.onBackground04
    }],
    contentContainerStyle: {
      paddingLeft: left,
      paddingRight: right
    }
  }, (0, _uikitUtils.conditionChaining)([searchLimited, canRenderMembers], [renderLimitGuide(), renderMembers(), null])));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  suggestion: {
    height: 196
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  scrollView: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  userContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userAvatar: {
    marginRight: 16
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1
  },
  userNickname: {
    flexShrink: 1,
    lineHeight: 44,
    textAlignVertical: 'center',
    marginRight: 6
  },
  userId: {
    lineHeight: 44,
    textAlignVertical: 'center',
    minWidth: 32,
    flexShrink: 1,
    marginRight: 16
  },
  searchLimited: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
var _default = GroupChannelSuggestedMentionList;
exports.default = _default;
//# sourceMappingURL=GroupChannelSuggestedMentionList.js.map