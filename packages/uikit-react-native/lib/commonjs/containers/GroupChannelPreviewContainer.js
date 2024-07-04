"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ChannelCover = _interopRequireDefault(require("../components/ChannelCover"));
var _constants = require("../constants");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelPreviewContainer = _ref => {
  let {
    onPress,
    onLongPress,
    channel
  } = _ref;
  const {
    currentUser,
    sdk,
    sbOptions,
    mentionManager
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const [typingUsers, setTypingUsers] = (0, _react.useState)([]);
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelPreviewContainer_TypingIndicator');
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
    onTypingStatusUpdated(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (!sbOptions.uikit.groupChannel.channelList.enableTypingIndicator) return;
      setTypingUsers(eventChannel.getTypingUsers());
    }
  });
  const outgoingStatus = (0, _uikitChatHooks.useMessageOutgoingStatus)(sdk, channel, channel.lastMessage);
  const bodyText = (0, _uikitUtils.useIIFE)(() => {
    if (typingUsers.length > 0) return STRINGS.LABELS.TYPING_INDICATOR_TYPINGS(typingUsers) || '';else return STRINGS.GROUP_CHANNEL_LIST.CHANNEL_PREVIEW_BODY(channel);
  });
  const fileType = (0, _uikitUtils.useIIFE)(() => {
    var _channel$lastMessage;
    if (!((_channel$lastMessage = channel.lastMessage) !== null && _channel$lastMessage !== void 0 && _channel$lastMessage.isFileMessage())) return undefined;
    if (typingUsers.length > 0) return undefined;
    if ((0, _uikitUtils.isVoiceMessage)(channel.lastMessage)) return undefined;
    return (0, _uikitUtils.getFileTypeFromMessage)(channel.lastMessage);
  });
  const titleCaptionIcon = (0, _uikitUtils.useIIFE)(() => {
    if (!channel.lastMessage || channel.isEphemeral) return undefined;
    if (!sbOptions.uikit.groupChannel.channelList.enableMessageReceiptStatus) return undefined;
    if (!(0, _uikitUtils.isMyMessage)(channel.lastMessage, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId)) return undefined;
    if (outgoingStatus === 'PENDING') {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.LoadingSpinner, {
        size: 16,
        style: styles.titleCaptionIcon
      });
    }
    if (outgoingStatus === 'FAILED') {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'error',
        size: 16,
        color: colors.error,
        style: styles.titleCaptionIcon
      });
    }
    if (outgoingStatus === 'UNDELIVERED') {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'done',
        size: 16,
        color: colors.onBackground03,
        containerStyle: styles.titleCaptionIcon
      });
    }
    if (outgoingStatus === 'DELIVERED' || outgoingStatus === 'UNREAD') {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'done-all',
        size: 16,
        color: colors.onBackground03,
        style: styles.titleCaptionIcon
      });
    }
    if (outgoingStatus === 'READ') {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'done-all',
        size: 16,
        color: colors.secondary,
        style: styles.titleCaptionIcon
      });
    }
    return undefined;
  });
  const unreadMessageCount = (0, _uikitUtils.useIIFE)(() => channel.isEphemeral ? 0 : channel.unreadMessageCount);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    delayLongPress: _constants.DEFAULT_LONG_PRESS_DELAY,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelPreview, {
    customCover: /*#__PURE__*/_react.default.createElement(_ChannelCover.default, {
      channel: channel,
      size: 56
    }),
    coverUrl: channel.coverUrl,
    title: STRINGS.GROUP_CHANNEL_LIST.CHANNEL_PREVIEW_TITLE((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? '', channel),
    titleCaptionLeft: titleCaptionIcon,
    titleCaption: STRINGS.GROUP_CHANNEL_LIST.CHANNEL_PREVIEW_TITLE_CAPTION(channel),
    body: bodyText,
    bodyIcon: fileType && (0, _uikitUtils.getFileIconFromMessageType)((0, _uikitUtils.convertFileTypeToMessageType)(fileType)),
    badgeCount: unreadMessageCount,
    mentioned: channel.unreadMentionCount > 0,
    mentionTrigger: mentionManager.config.trigger,
    memberCount: channel.memberCount > 2 ? channel.memberCount : undefined,
    frozen: channel.isFrozen,
    broadcast: channel.isBroadcast,
    notificationOff: channel.myPushTriggerOption === 'off'
  }));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  titleCaptionIcon: {
    marginRight: 4
  },
  broadcastCover: {
    padding: 12,
    borderRadius: 28
  }
});
var _default = GroupChannelPreviewContainer;
exports.default = _default;
//# sourceMappingURL=GroupChannelPreviewContainer.js.map