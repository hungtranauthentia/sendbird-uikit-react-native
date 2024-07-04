"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Image_ReactNative = _ref => {
  let {
    onLoad,
    onError,
    style,
    tintColor,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({}, props, {
    style: [style, {
      tintColor
    }],
    onError: onError && (e => onError(e.nativeEvent)),
    onLoad: onLoad && (e => onLoad(e.nativeEvent.source))
  }));
};
var _default = Image_ReactNative;
exports.default = _default;
//# sourceMappingURL=Image.reactnative.js.map