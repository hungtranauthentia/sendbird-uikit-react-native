"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AdminMessage = props => {
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption2: true,
    color: colors.onBackground02,
    style: styles.text
  }, props.message.message));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
});
var _default = AdminMessage;
exports.default = _default;
//# sourceMappingURL=Message.admin.js.map