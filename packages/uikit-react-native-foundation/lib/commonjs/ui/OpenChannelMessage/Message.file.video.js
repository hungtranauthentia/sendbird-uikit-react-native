"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _VideoThumbnail = require("../../components/VideoThumbnail");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const VideoFileMessage = props => {
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const uri = (0, _uikitUtils.getThumbnailUriFromFileMessage)(props.message);
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, rest, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    style: styles.container,
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/_react.default.createElement(_VideoThumbnail.VideoThumbnail, {
    style: styles.container,
    source: uri,
    fetchThumbnailFromVideoSource: props.fetchThumbnailFromVideoSource
  })));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    maxWidth: 296,
    height: 196,
    borderRadius: 8,
    overflow: 'hidden'
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  playIcon: {
    padding: 10,
    borderRadius: 50
  }
});
var _default = VideoFileMessage;
exports.default = _default;
//# sourceMappingURL=Message.file.video.js.map