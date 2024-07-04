import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChannelHandler } from '@sendbird/uikit-chat-hooks';
import { Icon, Image, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useUniqHandlerId } from '@sendbird/uikit-utils';
import { UNKNOWN_USER_ID } from '../../constants';
import { useReaction, useSendbirdChat } from '../../hooks/useContext';
const BottomSheetReactionAddon = _ref => {
  let {
    onClose,
    message,
    channel
  } = _ref;
  const {
    emojiManager,
    currentUser,
    sdk
  } = useSendbirdChat();
  const {
    updateReactionFocusedItem,
    openReactionList
  } = useReaction();
  const {
    colors
  } = useUIKitTheme();
  const handlerId = useUniqHandlerId('BottomSheetReactionAddon');
  const {
    left,
    right
  } = useSafeAreaInsets();
  useChannelHandler(sdk, handlerId, {
    async onReactionUpdated(eventChannel, event) {
      if ((channel === null || channel === void 0 ? void 0 : channel.url) === eventChannel.url && event.messageId === (message === null || message === void 0 ? void 0 : message.messageId)) {
        const msg = await sdk.message.getMessage({
          includeReactions: true,
          messageId: message.messageId,
          channelUrl: message.channelUrl,
          channelType: message.channelType
        });
        if (msg) updateReactionFocusedItem({
          message: msg
        });
      }
    }
  });
  const emojiAll = emojiManager.allEmoji.slice(0, 5);
  const color = colors.ui.reaction.default;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      marginRight: right,
      marginLeft: left
    }]
  }, emojiAll.map(_ref2 => {
    var _message$reactions, _message$reactions$fi;
    let {
      key,
      url
    } = _ref2;
    const reactionUserIds = (message === null || message === void 0 ? void 0 : (_message$reactions = message.reactions) === null || _message$reactions === void 0 ? void 0 : (_message$reactions$fi = _message$reactions.find(it => it.key === key)) === null || _message$reactions$fi === void 0 ? void 0 : _message$reactions$fi.userIds) ?? [];
    const currentUserIdx = reactionUserIds.indexOf((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? UNKNOWN_USER_ID);
    const reacted = currentUserIdx > -1;
    const onPress = () => {
      if (reacted) channel.deleteReaction(message, key);else channel.addReaction(message, key);
      onClose();
    };
    return /*#__PURE__*/React.createElement(Pressable, {
      key: key,
      onPress: onPress,
      style: _ref3 => {
        let {
          pressed
        } = _ref3;
        return [styles.button, {
          backgroundColor: reacted || pressed ? color.selected.background : color.enabled.background
        }];
      }
    }, /*#__PURE__*/React.createElement(Image, {
      source: {
        uri: url
      },
      style: styles.emoji
    }));
  }), /*#__PURE__*/React.createElement(Pressable, {
    onPress: async () => {
      await onClose();
      openReactionList({
        channel,
        message
      });
    },
    style: _ref4 => {
      let {
        pressed
      } = _ref4;
      return [styles.button, {
        backgroundColor: pressed ? color.selected.background : color.enabled.background
      }];
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'emoji-more',
    style: styles.emoji,
    color: colors.onBackground03
  })));
};
const styles = createStyleSheet({
  container: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 44,
    height: 44,
    padding: 4,
    borderRadius: 8
  },
  emoji: {
    width: '100%',
    height: '100%'
  }
});
export default BottomSheetReactionAddon;
//# sourceMappingURL=BottomSheetReactionAddon.js.map