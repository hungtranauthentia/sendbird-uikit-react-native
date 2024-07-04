"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _constants = require("../../constants");
var _useContext = require("../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  } = (0, _useContext.useSendbirdChat)();
  const {
    updateReactionFocusedItem,
    openReactionList
  } = (0, _useContext.useReaction)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('BottomSheetReactionAddon');
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    const currentUserIdx = reactionUserIds.indexOf((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? _constants.UNKNOWN_USER_ID);
    const reacted = currentUserIdx > -1;
    const onPress = () => {
      if (reacted) channel.deleteReaction(message, key);else channel.addReaction(message, key);
      onClose();
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
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
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
      source: {
        uri: url
      },
      style: styles.emoji
    }));
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
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
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'emoji-more',
    style: styles.emoji,
    color: colors.onBackground03
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
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
var _default = BottomSheetReactionAddon;
exports.default = _default;
//# sourceMappingURL=BottomSheetReactionAddon.js.map