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
    variant = 'incoming'
  } = props;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const fileType = (0, _uikitUtils.getFileType)(props.message.type || (0, _uikitUtils.getFileExtension)(props.message.name));
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, props, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: props.onPress,
    onLongPress: props.onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      backgroundColor: pressed ? color.pressed.background : color.enabled.background,
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_Box.default, {
      style: styles.bubble
    }, /*#__PURE__*/_react.default.createElement(_Icon.default.File, {
      fileType: fileType,
      size: 24,
      containerStyle: {
        backgroundColor: colors.background,
        padding: 2,
        borderRadius: 8,
        marginRight: 8
      }
    }), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      ellipsizeMode: 'middle',
      numberOfLines: 1,
      color: pressed ? color.pressed.textMsg : color.enabled.textMsg,
      style: styles.name
    }, (0, _uikitUtils.truncate)(((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.fileName) || props.message.name, {
      mode: 'mid',
      maxLen: 20
    }))), props.children);
  }));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    overflow: 'hidden',
    borderRadius: 16
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  name: {
    flexShrink: 1
  }
});
var _default = FileMessage;
exports.default = _default;
//# sourceMappingURL=Message.file.js.map