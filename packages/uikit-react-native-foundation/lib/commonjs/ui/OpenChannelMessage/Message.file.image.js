"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _ImageWithPlaceholder = _interopRequireDefault(require("../../components/ImageWithPlaceholder"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ImageFileMessage = props => {
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const uri = (0, _uikitUtils.getThumbnailUriFromFileMessage)(props.message);
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, rest, /*#__PURE__*/_react.default.createElement(_Box.default, {
    borderRadius: 8,
    overflow: 'hidden',
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    style: styles.container,
    activeOpacity: 0.8,
    onPress: onPress,
    onLongPress: onLongPress
  }, /*#__PURE__*/_react.default.createElement(_ImageWithPlaceholder.default, {
    source: {
      uri
    },
    width: '100%',
    height: '100%'
  }))));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    maxWidth: 296,
    height: 196
  }
});
var _default = ImageFileMessage;
exports.default = _default;
//# sourceMappingURL=Message.file.image.js.map