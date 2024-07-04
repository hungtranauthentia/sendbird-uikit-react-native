"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageSearchResultItem = _ref => {
  let {
    onPress,
    message
  } = _ref;
  const {
    colors,
    select,
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const fileIcon = (0, _uikitUtils.useIIFE)(() => {
    if (!(message !== null && message !== void 0 && message.isFileMessage())) return undefined;
    if ((0, _uikitUtils.isVoiceMessage)(message)) return undefined;
    return (0, _uikitUtils.getFileIconFromMessage)(message);
  });
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
    size: styles.avatarSize.width,
    uri: getSenderProfile(message),
    containerStyle: styles.avatar
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flex: 1,
    paddingRight: 16
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.titleLine
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flex: 1,
    marginRight: 4,
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    subtitle2: true,
    color: colors.onBackground01,
    numberOfLines: 1
  }, STRINGS.MESSAGE_SEARCH.SEARCH_RESULT_ITEM_TITLE(message))), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    paddingTop: 2
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption2: true,
    color: colors.onBackground02
  }, STRINGS.MESSAGE_SEARCH.SEARCH_RESULT_ITEM_TITLE_CAPTION(message)))), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flex: 1
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    alignItems: 'center',
    flexDirection: 'row'
  }, fileIcon && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: fileIcon,
    size: 18,
    color: colors.onBackground02,
    containerStyle: [styles.bodyIcon, {
      backgroundColor: select({
        light: palette.background100,
        dark: palette.background500
      })
    }]
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    numberOfLines: fileIcon ? 1 : 2,
    ellipsizeMode: fileIcon ? 'middle' : 'tail',
    style: styles.bodyText,
    color: colors.onBackground03
  }, STRINGS.MESSAGE_SEARCH.SEARCH_RESULT_ITEM_BODY(message)))), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.separator,
    backgroundColor: colors.onBackground04
  }))));
};
function getSenderProfile(message) {
  if (message.isUserMessage() || message.isFileMessage()) {
    return message.sender.profileUrl;
  } else {
    return undefined;
  }
}
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    height: 76,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    marginHorizontal: 16
  },
  avatarSize: {
    width: 56
  },
  titleLine: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 4
  },
  bodyIcon: {
    borderRadius: 8,
    width: 26,
    height: 26,
    marginRight: 4
  },
  bodyText: {
    flex: 1,
    lineHeight: 16
  },
  separator: {
    position: 'absolute',
    left: 0,
    right: -16,
    bottom: 0,
    height: 1
  }
});
var _default = MessageSearchResultItem;
exports.default = _default;
//# sourceMappingURL=MessageSearchResultItem.js.map