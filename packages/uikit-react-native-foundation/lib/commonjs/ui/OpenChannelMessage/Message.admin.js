"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AdminMessage = props => {
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    marginVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: color.enabled.adminBackground
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption2: true,
    color: colors.onBackground02
  }, props.message.message)));
};
var _default = AdminMessage;
exports.default = _default;
//# sourceMappingURL=Message.admin.js.map