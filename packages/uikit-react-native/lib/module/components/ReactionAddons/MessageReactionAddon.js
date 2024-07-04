import React from 'react';
import { Pressable } from 'react-native';
import { createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getReactionCount } from '@sendbird/uikit-utils';
import { DEFAULT_LONG_PRESS_DELAY, UNKNOWN_USER_ID } from '../../constants';
import { useReaction, useSendbirdChat } from '../../hooks/useContext';
import ReactionRoundedButton from './ReactionRoundedButton';
const NUM_COL = 4;
const REACTION_MORE_KEY = 'reaction-more-button';
const getUserReacted = function (reaction) {
  let userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : UNKNOWN_USER_ID;
  return reaction.userIds.indexOf(userId) > -1;
};
const createOnPressReaction = (reaction, channel, message, reacted) => {
  return () => {
    if (reacted) {
      return channel.deleteReaction(message, reaction.key);
    } else {
      return channel.addReaction(message, reaction.key);
    }
  };
};
const createReactionButtons = (channel, message, getEmoji, emojiLimit, onOpenReactionList, onOpenReactionUserList, currentUserId) => {
  const reactions = message.reactions ?? [];
  const buttons = reactions.map((reaction, index) => {
    const isNotLastOfRow = index % NUM_COL !== NUM_COL - 1;
    const isNotLastOfCol = index < NUM_COL && reactions.length >= NUM_COL;
    return /*#__PURE__*/React.createElement(Pressable, {
      key: reaction.key,
      onPress: createOnPressReaction(reaction, channel, message, getUserReacted(reaction, currentUserId)),
      onLongPress: () => onOpenReactionUserList(index),
      delayLongPress: DEFAULT_LONG_PRESS_DELAY
    }, _ref => {
      let {
        pressed
      } = _ref;
      return /*#__PURE__*/React.createElement(ReactionRoundedButton, {
        url: getEmoji(reaction.key).url,
        count: getReactionCount(reaction),
        reacted: pressed || getUserReacted(reaction, currentUserId),
        style: [isNotLastOfRow && styles.marginRight, isNotLastOfCol && styles.marginBottom]
      });
    });
  });
  if (buttons.length < emojiLimit) {
    buttons.push( /*#__PURE__*/React.createElement(Pressable, {
      key: REACTION_MORE_KEY,
      onPress: onOpenReactionList
    }, _ref2 => {
      let {
        pressed
      } = _ref2;
      return /*#__PURE__*/React.createElement(ReactionRoundedButton.More, {
        pressed: pressed
      });
    }));
  }
  return buttons;
};
const MessageReactionAddon = _ref3 => {
  var _message$reactions;
  let {
    channel,
    message
  } = _ref3;
  const {
    colors
  } = useUIKitTheme();
  const {
    emojiManager,
    currentUser
  } = useSendbirdChat();
  const {
    openReactionList,
    openReactionUserList
  } = useReaction();
  if (!((_message$reactions = message.reactions) !== null && _message$reactions !== void 0 && _message$reactions.length)) return null;
  const reactionButtons = createReactionButtons(channel, message, key => emojiManager.allEmojiMap[key], emojiManager.allEmoji.length, () => openReactionList({
    channel,
    message
  }), focusIndex => openReactionUserList({
    channel,
    message,
    focusIndex
  }), currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
  return /*#__PURE__*/React.createElement(Pressable, {
    style: [styles.reactionContainer, {
      backgroundColor: colors.background,
      borderColor: colors.ui.reaction.rounded.enabled.background
    }]
  }, reactionButtons);
};
const styles = createStyleSheet({
  reactionContainer: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    borderRadius: 16,
    borderWidth: 1
  },
  marginRight: {
    marginRight: 4.5
  },
  marginBottom: {
    marginBottom: 4
  }
});
export default MessageReactionAddon;
//# sourceMappingURL=MessageReactionAddon.js.map