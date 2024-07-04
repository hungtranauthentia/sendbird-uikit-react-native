"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageToReplyPreview = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageToReplyPreview = _ref => {
  let {
    messageToReply,
    setMessageToReply
  } = _ref;
  const {
    colors,
    select,
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    mediaService
  } = (0, _useContext.usePlatformService)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const getFileIconAsImage = url => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ImageWithPlaceholder, {
      source: {
        uri: url
      },
      style: styles.previewImage
    });
  };
  const getFileIconAsVideoThumbnail = url => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.VideoThumbnail, {
      style: styles.previewImage,
      iconSize: 0,
      source: url,
      fetchThumbnailFromVideoSource: uri => mediaService.getVideoThumbnail({
        url: uri,
        timeMills: 1000
      })
    });
  };
  const getFileIconAsSymbol = icon => {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: icon,
      size: 20,
      color: colors.onBackground02,
      containerStyle: [styles.fileIcon, {
        backgroundColor: select({
          light: palette.background100,
          dark: palette.background500
        })
      }]
    });
  };
  const getFileIcon = messageToReply => {
    if (messageToReply !== null && messageToReply !== void 0 && messageToReply.isFileMessage()) {
      const messageType = (0, _uikitUtils.getMessageType)(messageToReply);
      switch (messageType) {
        case 'file.image':
          return getFileIconAsImage((0, _uikitUtils.getThumbnailUriFromFileMessage)(messageToReply));
        case 'file.video':
          return getFileIconAsVideoThumbnail((0, _uikitUtils.getThumbnailUriFromFileMessage)(messageToReply));
        case 'file.voice':
          return null;
        default:
          return getFileIconAsSymbol((0, _uikitUtils.getFileIconFromMessageType)(messageType));
      }
    }
    return null;
  };
  if (!messageToReply) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.messageToReplyContainer, {
      borderColor: colors.onBackground04
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, getFileIcon(messageToReply), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      flexDirection: 'column'
    }
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    numberOfLines: 1,
    style: {
      fontSize: 13,
      fontWeight: '900',
      marginBottom: 4
    }
  }, STRINGS.LABELS.CHANNEL_INPUT_REPLY_PREVIEW_TITLE(messageToReply.sender)), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    numberOfLines: 1,
    style: {
      fontSize: 13,
      color: colors.onBackground03
    }
  }, STRINGS.LABELS.CHANNEL_INPUT_REPLY_PREVIEW_BODY(messageToReply)))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => setMessageToReply === null || setMessageToReply === void 0 ? void 0 : setMessageToReply(undefined)
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'close',
    size: 24,
    color: colors.onBackground01,
    containerStyle: styles.closeIcon
  })));
};
exports.MessageToReplyPreview = MessageToReplyPreview;
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  previewImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginTop: 2,
    marginRight: 10,
    overflow: 'hidden'
  },
  messageToReplyContainer: {
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: 'center',
    borderTopWidth: 1
  },
  fileIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 2
  },
  closeIcon: {
    marginLeft: 4,
    padding: 4
  }
});
//# sourceMappingURL=MessageToReplyPreview.js.map