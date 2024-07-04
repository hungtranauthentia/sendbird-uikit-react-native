"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _moduleContext = require("../../domain/groupChannel/module/moduleContext");
var _useContext = require("../../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelMessageParentMessage = _ref => {
  let {
    variant,
    channel,
    message,
    childMessage,
    onPress
  } = _ref;
  const {
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const groupChannelPubSub = (0, _react.useContext)(_moduleContext.GroupChannelContexts.PubSub);
  const {
    select,
    colors,
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    mediaService
  } = (0, _useContext.usePlatformService)();
  const [parentMessage, setParentMessage] = (0, _react.useState)(() => message);
  const type = (0, _uikitUtils.getMessageType)(parentMessage);
  (0, _react.useEffect)(() => {
    return groupChannelPubSub.subscribe(_ref2 => {
      let {
        type,
        data
      } = _ref2;
      if (type === 'MESSAGES_UPDATED') {
        const updatedParent = data.messages.find(it => {
          return it.messageId === parentMessage.messageId;
        });
        if (updatedParent) setParentMessage(updatedParent);
      }
    });
  }, []);
  const renderMessageWithText = message => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      style: styles.bubbleContainer,
      backgroundColor: select({
        light: palette.background100,
        dark: palette.background400
      })
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
      body3: true,
      color: colors.onBackground03,
      suppressHighlighting: true,
      numberOfLines: 2,
      ellipsizeMode: 'tail'
    }, message));
  };
  const renderFileMessageAsVideoThumbnail = url => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.VideoThumbnail, {
      style: styles.image,
      iconSize: 18,
      source: url,
      fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
        url: uri,
        timeMills: 1000
      })
    });
  };
  const renderFileMessageAsPreview = url => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ImageWithPlaceholder, {
      style: styles.image,
      source: {
        uri: url
      }
    });
  };
  const renderFileMessageAsDownloadable = name => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      style: styles.bubbleContainer,
      backgroundColor: select({
        light: palette.background100,
        dark: palette.background400
      })
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: (0, _uikitUtils.getFileIconFromMessageType)(type),
      size: 16,
      color: colors.onBackground03,
      containerStyle: styles.fileIcon
    }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
      body3: true,
      color: colors.onBackground03,
      numberOfLines: 1,
      ellipsizeMode: 'middle'
    }, (0, _uikitUtils.truncate)(name, {
      mode: 'mid',
      maxLen: 20
    })));
  };
  const parentMessageComponent = (0, _uikitUtils.useIIFE)(() => {
    if (channel.messageOffsetTimestamp > parentMessage.createdAt) {
      return renderMessageWithText(STRINGS.LABELS.MESSAGE_UNAVAILABLE);
    }
    switch (type) {
      case 'user':
      case 'user.opengraph':
        {
          return renderMessageWithText(parentMessage.message);
        }
      case 'file':
      case 'file.audio':
        {
          return renderFileMessageAsDownloadable(parentMessage.name);
        }
      case 'file.video':
        {
          return renderFileMessageAsVideoThumbnail((0, _uikitUtils.getThumbnailUriFromFileMessage)(parentMessage));
        }
      case 'file.image':
        {
          return renderFileMessageAsPreview((0, _uikitUtils.getThumbnailUriFromFileMessage)(parentMessage));
        }
      case 'file.voice':
        {
          return renderMessageWithText(STRINGS.LABELS.VOICE_MESSAGE);
        }
      default:
        {
          return null;
        }
    }
  });
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, null, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    alignItems: variant === 'outgoing' ? 'flex-end' : 'flex-start',
    paddingLeft: variant === 'outgoing' ? 0 : 12,
    paddingRight: variant === 'outgoing' ? 12 : 0
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    onPress: () => onPress === null || onPress === void 0 ? void 0 : onPress(parentMessage),
    style: styles.senderLabel
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'reply-filled',
    size: 13,
    color: colors.onBackground03,
    containerStyle: {
      marginRight: 4
    }
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption1: true,
    color: colors.onBackground03
  }, STRINGS.LABELS.REPLY_FROM_SENDER_TO_RECEIVER(childMessage, parentMessage, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId)))), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flexDirection: 'row',
    justifyContent: variant === 'outgoing' ? 'flex-end' : 'flex-start',
    style: styles.messageContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    onPress: () => onPress === null || onPress === void 0 ? void 0 : onPress(parentMessage)
  }, parentMessageComponent)));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  messageContainer: {
    opacity: 0.5,
    marginTop: 4,
    marginBottom: -6
  },
  bubbleContainer: {
    maxWidth: 220,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 6
  },
  image: {
    width: 156,
    height: 104,
    borderRadius: 16,
    overflow: 'hidden'
  },
  fileIcon: {
    width: 16,
    height: 16,
    borderRadius: 10,
    marginRight: 4,
    marginTop: 2
  },
  senderLabel: {
    flexDirection: 'row'
  }
});
var _default = GroupChannelMessageParentMessage;
exports.default = _default;
//# sourceMappingURL=GroupChannelMessageParentMessage.js.map