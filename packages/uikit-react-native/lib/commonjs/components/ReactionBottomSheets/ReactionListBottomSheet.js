"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _constants = require("../../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  } = (0, _reactNative.useWindowDimensions)();
  const {
    bottom,
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    currentUser,
    emojiManager
  } = chatCtx;
  const {
    channel,
    message
  } = reactionCtx;
  const color = colors.ui.reaction.default;
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Modal, {
    type: 'slide',
    visible: Boolean(visible && channel && message),
    onClose: onClose,
    onDismiss: onDismiss,
    backgroundStyle: styles.modal
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width,
      paddingBottom: bottom,
      backgroundColor: colors.ui.dialog.default.none.background,
      paddingLeft: left + styles.container.paddingHorizontal,
      paddingRight: right + styles.container.paddingHorizontal
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: emojiManager.allEmoji,
    numColumns: NUM_COLUMN,
    keyExtractor: item => item.key,
    contentContainerStyle: styles.flatlist,
    ItemSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
      const idx = reactedUserIds.indexOf((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? _constants.UNKNOWN_USER_ID);
      const reacted = idx > -1;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.emojiItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
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
      }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
        source: {
          uri: url
        },
        style: styles.emoji
      })));
    }
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
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
var _default = ReactionListBottomSheet;
exports.default = _default;
//# sourceMappingURL=ReactionListBottomSheet.js.map