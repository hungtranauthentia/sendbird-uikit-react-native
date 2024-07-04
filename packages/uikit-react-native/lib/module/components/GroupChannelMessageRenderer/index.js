function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useEffect, useRef } from 'react';
import { Box, GroupChannelMessage, Text, TypingIndicatorBubble, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { calcMessageGrouping, getMessageType, isMyMessage, isVoiceMessage, shouldRenderParentMessage, shouldRenderReaction, useIIFE } from '@sendbird/uikit-utils';
import { VOICE_MESSAGE_META_ARRAY_DURATION_KEY } from '../../constants';
import { GroupChannelContexts } from '../../domain/groupChannel/module/moduleContext';
import { useLocalization, usePlatformService, useSendbirdChat } from '../../hooks/useContext';
import SBUUtils from '../../libs/SBUUtils';
import { TypingIndicatorType } from '../../types';
import { ReactionAddons } from '../ReactionAddons';
import GroupChannelMessageDateSeparator from './GroupChannelMessageDateSeparator';
import GroupChannelMessageFocusAnimation from './GroupChannelMessageFocusAnimation';
import GroupChannelMessageOutgoingStatus from './GroupChannelMessageOutgoingStatus';
import GroupChannelMessageParentMessage from './GroupChannelMessageParentMessage';
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
  const playerUnsubscribes = useRef([]);
  const {
    palette
  } = useUIKitTheme();
  const {
    sbOptions,
    currentUser,
    mentionManager
  } = useSendbirdChat();
  const {
    STRINGS
  } = useLocalization();
  const {
    mediaService,
    playerService
  } = usePlatformService();
  const {
    groupWithPrev,
    groupWithNext
  } = calcMessageGrouping(Boolean(enableMessageGrouping), message, prevMessage, nextMessage);
  const reactionChildren = useIIFE(() => {
    const configs = sbOptions.uikitWithAppInfo.groupChannel.channel;
    if (shouldRenderReaction(channel, channel.isSuper ? configs.enableReactionsSupergroup : configs.enableReactions) && message.reactions && message.reactions.length > 0) {
      return /*#__PURE__*/React.createElement(ReactionAddons.Message, {
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
  const variant = isMyMessage(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? 'outgoing' : 'incoming';
  const messageProps = {
    channel,
    variant,
    onPress,
    onLongPress,
    onPressURL: url => SBUUtils.openURL(url),
    onPressAvatar: () => {
      if ('sender' in message) onShowUserProfile === null || onShowUserProfile === void 0 ? void 0 : onShowUserProfile(message.sender);
    },
    onPressMentionedUser: mentionedUser => {
      if (mentionedUser) onShowUserProfile === null || onShowUserProfile === void 0 ? void 0 : onShowUserProfile(mentionedUser);
    },
    onToggleVoiceMessage: async (state, setState) => {
      if (isVoiceMessage(message) && message.sendingStatus === 'succeeded') {
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
    sendingStatus: isMyMessage(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? /*#__PURE__*/React.createElement(GroupChannelMessageOutgoingStatus, {
      channel: channel,
      message: message
    }) : null,
    parentMessage: shouldRenderParentMessage(message) ? /*#__PURE__*/React.createElement(GroupChannelMessageParentMessage, {
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
          const mentionColor = !isMyMessage(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) && user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? palette.onBackgroundLight01 : parentProps === null || parentProps === void 0 ? void 0 : parentProps.color;
          return /*#__PURE__*/React.createElement(Text, _extends({}, parentProps, {
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
    switch (getMessageType(message)) {
      case 'admin':
        {
          return /*#__PURE__*/React.createElement(GroupChannelMessage.Admin, _extends({
            message: message
          }, messageProps));
        }
      case 'user':
      case 'user.opengraph':
        {
          if (message.ogMetaData && sbOptions.uikitWithAppInfo.groupChannel.channel.enableOgtag) {
            return /*#__PURE__*/React.createElement(GroupChannelMessage.OpenGraphUser, _extends({
              message: message
            }, userMessageProps, messageProps));
          } else {
            return /*#__PURE__*/React.createElement(GroupChannelMessage.User, _extends({
              message: message
            }, userMessageProps, messageProps));
          }
        }
      case 'file':
      case 'file.audio':
        {
          return /*#__PURE__*/React.createElement(GroupChannelMessage.File, _extends({
            message: message
          }, messageProps));
        }
      case 'file.image':
        {
          return /*#__PURE__*/React.createElement(GroupChannelMessage.ImageFile, _extends({
            message: message
          }, messageProps));
        }
      case 'file.video':
        {
          return /*#__PURE__*/React.createElement(GroupChannelMessage.VideoFile, _extends({
            message: message,
            fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
              url: uri,
              timeMills: 1000
            })
          }, messageProps));
        }
      case 'file.voice':
        {
          return /*#__PURE__*/React.createElement(GroupChannelMessage.VoiceFile, _extends({
            message: message,
            durationMetaArrayKey: VOICE_MESSAGE_META_ARRAY_DURATION_KEY,
            onUnmount: () => {
              if (isVoiceMessage(message) && playerService.uri === message.url) {
                resetPlayer();
              }
            }
          }, messageProps));
        }
      case 'unknown':
      default:
        {
          return /*#__PURE__*/React.createElement(GroupChannelMessage.Unknown, _extends({
            message: message
          }, messageProps));
        }
    }
  };
  const messageGap = useIIFE(() => {
    if (message.isAdminMessage()) {
      if (nextMessage !== null && nextMessage !== void 0 && nextMessage.isAdminMessage()) {
        return 8;
      } else {
        return 16;
      }
    } else if (nextMessage && shouldRenderParentMessage(nextMessage)) {
      return 16;
    } else if (groupWithNext) {
      return 2;
    } else {
      return 16;
    }
  });
  return /*#__PURE__*/React.createElement(Box, {
    paddingHorizontal: 16,
    marginBottom: messageGap
  }, /*#__PURE__*/React.createElement(GroupChannelMessageDateSeparator, {
    message: message,
    prevMessage: prevMessage
  }), /*#__PURE__*/React.createElement(GroupChannelMessageFocusAnimation, {
    focused: focused
  }, renderMessage()));
};
export const GroupChannelTypingIndicatorBubble = () => {
  const {
    sbOptions
  } = useSendbirdChat();
  const {
    publish
  } = useContext(GroupChannelContexts.PubSub);
  const {
    typingUsers
  } = useContext(GroupChannelContexts.TypingIndicator);
  const shouldRenderBubble = useIIFE(() => {
    if (typingUsers.length === 0) return false;
    if (!sbOptions.uikit.groupChannel.channel.enableTypingIndicator) return false;
    if (!sbOptions.uikit.groupChannel.channel.typingIndicatorTypes.has(TypingIndicatorType.Bubble)) return false;
    return true;
  });
  useEffect(() => {
    if (shouldRenderBubble) publish({
      type: 'TYPING_BUBBLE_RENDERED'
    });
  }, [shouldRenderBubble]);
  if (!shouldRenderBubble) return null;
  return /*#__PURE__*/React.createElement(Box, {
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  }, /*#__PURE__*/React.createElement(TypingIndicatorBubble, {
    typingUsers: typingUsers
  }));
};
export default /*#__PURE__*/React.memo(GroupChannelMessageRenderer);
//# sourceMappingURL=index.js.map