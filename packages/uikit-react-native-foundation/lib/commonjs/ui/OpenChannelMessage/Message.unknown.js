"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const UnknownMessage = props => {
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const {
    onPress,
    onLongPress,
    ...rest
  } = props;
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings, _props$strings2;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, _extends({
      pressed: pressed
    }, rest), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: color.enabled.textMsg
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.unknownTitle) ?? '(Unknown message type)'), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: color.enabled.textMsgPostfix
    }, ((_props$strings2 = props.strings) === null || _props$strings2 === void 0 ? void 0 : _props$strings2.unknownDescription) ?? 'Cannot read this message.'));
  });
};
var _default = UnknownMessage;
exports.default = _default;
//# sourceMappingURL=Message.unknown.js.map