"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GroupChannelTypingIndicatorBubble = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _constants = require("../../constants");
var _moduleContext = require("../../domain/groupChannel/module/moduleContext");
var _useContext = require("../../hooks/useContext");
var _SBUUtils = _interopRequireDefault(require("../../libs/SBUUtils"));
var _types = require("../../types");
var _ReactionAddons = require("../ReactionAddons");
var _GroupChannelMessageDateSeparator = _interopRequireDefault(require("./GroupChannelMessageDateSeparator"));
var _GroupChannelMessageFocusAnimation = _interopRequireDefault(require("./GroupChannelMessageFocusAnimation"));
var _GroupChannelMessageOutgoingStatus = _interopRequireDefault(require("./GroupChannelMessageOutgoingStatus"));
var _GroupChannelMessageParentMessage = _interopRequireDefault(require("./GroupChannelMessageParentMessage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const GroupChannelMessageRenderer = _ref => {
  let {
    channel,
    message,
    onPress,
    onLongPress,
    onPressParentMessage,
    onShowUserProfile,
    enableMessageGrouping,
    focused,
    prevMessage,
    nextMessage
  } = _ref;
  const playerUnsubscribes = (0, _react.useRef)([]);
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    sbOptions,
    currentUser,
    mentionManager
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    mediaService,
    playerService
  } = (0, _useContext.usePlatformService)();
  const {
    groupWithPrev,
    groupWithNext
  } = (0, _uikitUtils.calcMessageGrouping)(Boolean(enableMessageGrouping), message, prevMessage, nextMessage);
  const reactionChildren = (0, _uikitUtils.useIIFE)(() => {
    const configs = sbOptions.uikitWithAppInfo.groupChannel.channel;
    if ((0, _uikitUtils.shouldRenderReaction)(channel, channel.isSuper ? configs.enableReactionsSupergroup : configs.enableReactions) && message.reactions && message.reactions.length > 0) {
      return /*#__PURE__*/_react.default.createElement(_ReactionAddons.ReactionAddons.Message, {
        channel: channel,
        message: message
      });
    }
    return null;
  });
  const resetPlayer = async () => {
    playerUnsubscribes.current.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch {}
    });
    playerUnsubscribes.current.length = 0;
    await playerService.reset();
  };
  const variant = (0, _uikitUtils.isMyMessage)(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? 'outgoing' : 'incoming';
  const messageProps = {
    channel,
    variant,
    onPress,
    onLongPress,
    onPressURL: url => _SBUUtils.default.openURL(url),
    onPressAvatar: () => {
      if ('sender' in message) onShowUserProfile === null || onShowUserProfile === void 0 ? void 0 : onShowUserProfile(message.sender);
    },
    onPressMentionedUser: mentionedUser => {
      if (mentionedUser) onShowUserProfile === null || onShowUserProfile === void 0 ? void 0 : onShowUserProfile(mentionedUser);
    },
    onToggleVoiceMessage: async (state, setState) => {
      if ((0, _uikitUtils.isVoiceMessage)(message) && message.sendingStatus === 'succeeded') {
        if (playerService.uri === message.url) {
          if (playerService.state === 'playing') {
            await playerService.pause();
          } else {
            await playerService.play(message.url);
          }
        } else {
          if (playerService.state !== 'idle') {
            await resetPlayer();
          }
          const shouldSeekToTime = state.duration > state.currentTime && state.currentTime > 0;
          let seekFinished = !shouldSeekToTime;
          const forPlayback = playerService.addPlaybackListener(_ref2 => {
            let {
              stopped,
              currentTime,
              duration
            } = _ref2;
            if (seekFinished) {
              setState(prevState => ({
                ...prevState,
                currentTime: stopped ? 0 : currentTime,
                duration
              }));
            }
          });
          const forState = playerService.addStateListener(state => {
            switch (state) {
              case 'preparing':
                setState(prevState => ({
                  ...prevState,
                  status: 'preparing'
                }));
                break;
              case 'playing':
                setState(prevState => ({
                  ...prevState,
                  status: 'playing'
                }));
                break;
              case 'idle':
              case 'paused':
                {
                  setState(prevState => ({
                    ...prevState,
                    status: 'paused'
                  }));
                  break;
                }
              case 'stopped':
                setState(prevState => ({
                  ...prevState,
                  status: 'paused'
                }));
                break;
            }
          });
          playerUnsubscribes.current.push(forPlayback, forState);
          await playerService.play(message.url);
          if (shouldSeekToTime) {
            await playerService.seek(state.currentTime);
            seekFinished = true;
          }
        }
      }
    },
    groupedWithPrev: groupWithPrev,
    groupedWithNext: groupWithNext,
    children: reactionChildren,
    sendingStatus: (0, _uikitUtils.isMyMessage)(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? /*#__PURE__*/_react.default.createElement(_GroupChannelMessageOutgoingStatus.default, {
      channel: channel,
      message: message
    }) : null,
    parentMessage: (0, _uikitUtils.shouldRenderParentMessage)(message) ? /*#__PURE__*/_react.default.createElement(_GroupChannelMessageParentMessage.default, {
      channel: channel,
      message: message.parentMessage,
      variant: variant,
      childMessage: message,
      onPress: onPressParentMessage
    }) : null,
    strings: {
      edited: STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX,
      senderName: 'sender' in message && message.sender.nickname || STRINGS.LABELS.USER_NO_NAME,
      sentDate: STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_TIME(message),
      fileName: message.isFileMessage() ? STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_FILE_TITLE(message) : '',
      unknownTitle: STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_TITLE(message),
      unknownDescription: STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_DESC(message)
    }
  };
  const userMessageProps = {
    renderRegexTextChildren: message => {
      if (mentionManager.shouldUseMentionedMessageTemplate(message, sbOptions.uikit.groupChannel.channel.enableMention)) {
        return message.mentionedMessageTemplate;
      } else {
        return message.message;
      }
    },
    regexTextPatterns: [{
      regex: mentionManager.templateRegex,
      replacer(_ref3) {
        var _message$mentionedUse;
        let {
          match,
          groups,
          parentProps,
          index,
          keyPrefix
        } = _ref3;
        const user = (_message$mentionedUse = message.mentionedUsers) === null || _message$mentionedUse === void 0 ? void 0 : _message$mentionedUse.find(it => it.userId === groups[2]);
        if (user) {
          const mentionColor = !(0, _uikitUtils.isMyMessage)(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) && user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? palette.onBackgroundLight01 : parentProps === null || parentProps === void 0 ? void 0 : parentProps.color;
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, _extends({}, parentProps, {
            key: `${keyPrefix}-${index}`,
            color: mentionColor,
            onPress: () => {
              var _messageProps$onPress;
              return (_messageProps$onPress = messageProps.onPressMentionedUser) === null || _messageProps$onPress === void 0 ? void 0 : _messageProps$onPress.call(messageProps, user);
            },
            onLongPress: messageProps.onLongPress,
            style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, {
              fontWeight: '700'
            }, user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) && {
              backgroundColor: palette.highlight
            }]
          }), `${mentionManager.asMentionedMessageText(user)}`);
        }
        return match;
      }
    }]
  };
  const renderMessage = () => {
    switch ((0, _uikitUtils.getMessageType)(message)) {
      case 'admin':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.Admin, _extends({
            message: message
          }, messageProps));
        }
      case 'user':
      case 'user.opengraph':
        {
          if (message.ogMetaData && sbOptions.uikitWithAppInfo.groupChannel.channel.enableOgtag) {
            return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.OpenGraphUser, _extends({
              message: message
            }, userMessageProps, messageProps));
          } else {
            return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.User, _extends({
              message: message
            }, userMessageProps, messageProps));
          }
        }
      case 'file':
      case 'file.audio':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.File, _extends({
            message: message
          }, messageProps));
        }
      case 'file.image':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.ImageFile, _extends({
            message: message
          }, messageProps));
        }
      case 'file.video':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.VideoFile, _extends({
            message: message,
            fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
              url: uri,
              timeMills: 1000
            })
          }, messageProps));
        }
      case 'file.voice':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.VoiceFile, _extends({
            message: message,
            durationMetaArrayKey: _constants.VOICE_MESSAGE_META_ARRAY_DURATION_KEY,
            onUnmount: () => {
              if ((0, _uikitUtils.isVoiceMessage)(message) && playerService.uri === message.url) {
                resetPlayer();
              }
            }
          }, messageProps));
        }
      case 'unknown':
      default:
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.GroupChannelMessage.Unknown, _extends({
            message: message
          }, messageProps));
        }
    }
  };
  const messageGap = (0, _uikitUtils.useIIFE)(() => {
    if (message.isAdminMessage()) {
      if (nextMessage !== null && nextMessage !== void 0 && nextMessage.isAdminMessage()) {
        return 8;
      } else {
        return 16;
      }
    } else if (nextMessage && (0, _uikitUtils.shouldRenderParentMessage)(nextMessage)) {
      return 16;
    } else if (groupWithNext) {
      return 2;
    } else {
      return 16;
    }
  });
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    paddingHorizontal: 16,
    marginBottom: messageGap
  }, /*#__PURE__*/_react.default.createElement(_GroupChannelMessageDateSeparator.default, {
    message: message,
    prevMessage: prevMessage
  }), /*#__PURE__*/_react.default.createElement(_GroupChannelMessageFocusAnimation.default, {
    focused: focused
  }, renderMessage()));
};
const GroupChannelTypingIndicatorBubble = () => {
  const {
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    publish
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.PubSub);
  const {
    typingUsers
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.TypingIndicator);
  const shouldRenderBubble = (0, _uikitUtils.useIIFE)(() => {
    if (typingUsers.length === 0) return false;
    if (!sbOptions.uikit.groupChannel.channel.enableTypingIndicator) return false;
    if (!sbOptions.uikit.groupChannel.channel.typingIndicatorTypes.has(_types.TypingIndicatorType.Bubble)) return false;
    return true;
  });
  (0, _react.useEffect)(() => {
    if (shouldRenderBubble) publish({
      type: 'TYPING_BUBBLE_RENDERED'
    });
  }, [shouldRenderBubble]);
  if (!shouldRenderBubble) return null;
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.TypingIndicatorBubble, {
    typingUsers: typingUsers
  }));
};
exports.GroupChannelTypingIndicatorBubble = GroupChannelTypingIndicatorBubble;
var _default = /*#__PURE__*/_react.default.memo(GroupChannelMessageRenderer);
exports.default = _default;
//# sourceMappingURL=index.js.map