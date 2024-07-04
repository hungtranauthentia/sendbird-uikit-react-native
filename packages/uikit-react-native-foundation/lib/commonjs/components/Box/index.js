"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Box = _ref => {
  let {
    style,
    children,
    ...props
  } = _ref;
  const boxStyle = useBoxStyle(props);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, props, {
    style: [boxStyle, style]
  }), children);
};
const useBoxStyle = props => {
  const theme = (0, _useUIKitTheme.default)();
  const {
    backgroundColor,
    ...rest
  } = props;
  return {
    backgroundColor: (0, _uikitUtils.isFunction)(backgroundColor) ? backgroundColor(theme) : backgroundColor,
    ...rest
  };
};
var _default = Box;
exports.default = _default;
//# sourceMappingURL=index.js.map