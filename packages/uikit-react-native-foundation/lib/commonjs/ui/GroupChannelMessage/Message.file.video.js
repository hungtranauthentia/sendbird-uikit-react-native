"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _VideoThumbnail = require("../../components/VideoThumbnail");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const VideoFileMessage = props => {
  const {
    onPress,
    onLongPress,
    variant = 'incoming'
  } = props;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const uri = (0, _uikitUtils.getThumbnailUriFromFileMessage)(props.message);
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, props, /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.container,
    backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
  }, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/_react.default.createElement(_VideoThumbnail.VideoThumbnail, {
    style: styles.image,
    source: uri,
    fetchThumbnailFromVideoSource: props.fetchThumbnailFromVideoSource
  })), props.children));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    maxWidth: 240,
    width: 240,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden'
  },
  playIcon: {
    padding: 10,
    borderRadius: 50
  }
});
var _default = VideoFileMessage;
exports.default = _default;
//# sourceMappingURL=Message.file.video.js.map