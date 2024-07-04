"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FileMessage = props => {
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const type = (0, _uikitUtils.getFileTypeFromMessage)(props.message);
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, rest, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      padding: 8,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      style: {
        backgroundColor: pressed ? color.pressed.bubbleBackground : color.enabled.bubbleBackground
      }
    }, /*#__PURE__*/_react.default.createElement(_Box.default, {
      padding: 4,
      marginRight: 8,
      borderRadius: 8,
      alignItems: 'flex-start',
      backgroundColor: colors.background
    }, /*#__PURE__*/_react.default.createElement(_Icon.default.File, {
      fileType: type,
      size: 32
    })), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      numberOfLines: 1,
      ellipsizeMode: 'middle',
      color: color.enabled.textMsg,
      style: styles.fileName
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.fileName) || props.message.name));
  }));
};
const styles = (0, _createStyleSheet.default)({
  fileName: {
    flexShrink: 1
  }
});
var _default = FileMessage;
exports.default = _default;
//# sourceMappingURL=Message.file.js.map