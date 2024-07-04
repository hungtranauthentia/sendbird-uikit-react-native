"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ReactionRoundedButton = _ref => {
  let {
    url,
    count,
    reacted,
    style
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const color = colors.ui.reaction.rounded;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.reactionContainer, {
      backgroundColor: reacted ? color.selected.background : color.enabled.background
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
    source: {
      uri: url
    },
    style: styles.emoji
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption4: true,
    color: colors.onBackground01,
    numberOfLines: 1,
    style: styles.count
  }, (0, _uikitUtils.truncatedCount)(count, 99, '')));
};
ReactionRoundedButton.More = _ref2 => {
  let {
    pressed
  } = _ref2;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const color = colors.ui.reaction.rounded;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.reactionContainer, {
      backgroundColor: pressed ? color.selected.background : color.enabled.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'emoji-more',
    color: colors.onBackground03,
    size: 20
  }));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    borderRadius: 24,
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  emoji: {
    width: 20,
    height: 20,
    marginRight: 4
  },
  count: {
    width: 13,
    textAlign: 'left'
  }
});
var _default = ReactionRoundedButton;
exports.default = _default;
//# sourceMappingURL=ReactionRoundedButton.js.map