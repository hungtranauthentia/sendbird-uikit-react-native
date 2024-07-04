import React from 'react';
import { FlatList, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Modal, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { UNKNOWN_USER_ID } from '../../constants';
const NUM_COLUMN = 6;
const ReactionListBottomSheet = _ref => {
  let {
    visible,
    onClose,
    onDismiss,
    reactionCtx,
    chatCtx
  } = _ref;
  const {
    width
  } = useWindowDimensions();
  const {
    bottom,
    left,
    right
  } = useSafeAreaInsets();
  const {
    colors
  } = useUIKitTheme();
  const {
    currentUser,
    emojiManager
  } = chatCtx;
  const {
    channel,
    message
  } = reactionCtx;
  const color = colors.ui.reaction.default;
  return /*#__PURE__*/React.createElement(Modal, {
    type: 'slide',
    visible: Boolean(visible && channel && message),
    onClose: onClose,
    onDismiss: onDismiss,
    backgroundStyle: styles.modal
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width,
      paddingBottom: bottom,
      backgroundColor: colors.ui.dialog.default.none.background,
      paddingLeft: left + styles.container.paddingHorizontal,
      paddingRight: right + styles.container.paddingHorizontal
    }]
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: emojiManager.allEmoji,
    numColumns: NUM_COLUMN,
    keyExtractor: item => item.key,
    contentContainerStyle: styles.flatlist,
    ItemSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: {
        height: 16
      }
    }),
    renderItem: _ref2 => {
      var _message$reactions, _message$reactions$fi;
      let {
        item: {
          key,
          url
        }
      } = _ref2;
      const reactedUserIds = (message === null || message === void 0 ? void 0 : (_message$reactions = message.reactions) === null || _message$reactions === void 0 ? void 0 : (_message$reactions$fi = _message$reactions.find(it => it.key === key)) === null || _message$reactions$fi === void 0 ? void 0 : _message$reactions$fi.userIds) ?? [];
      const idx = reactedUserIds.indexOf((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? UNKNOWN_USER_ID);
      const reacted = idx > -1;
      return /*#__PURE__*/React.createElement(View, {
        style: styles.emojiItem
      }, /*#__PURE__*/React.createElement(Pressable, {
        key: key,
        onPress: () => {
          if (message && channel) {
            if (reacted) channel.deleteReaction(message, key);else channel.addReaction(message, key);
          }
          onClose();
        },
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
      })));
    }
  })));
};
const styles = createStyleSheet({
  container: {
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 16,
    paddingHorizontal: 18,
    flexDirection: 'row'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  flatlist: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  emojiItem: {
    width: `${100 / NUM_COLUMN}%`,
    alignItems: 'center'
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
export default ReactionListBottomSheet;
//# sourceMappingURL=ReactionListBottomSheet.js.map