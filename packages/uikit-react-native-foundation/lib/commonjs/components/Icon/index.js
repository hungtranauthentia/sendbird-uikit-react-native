"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _icon = _interopRequireDefault(require("../../assets/icon"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Icon = _ref => {
  let {
    icon,
    color,
    size = 24,
    containerStyle,
    style
  } = _ref;
  const sizeStyle = sizeStyles[size] ?? {
    width: size,
    height: size
  };
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [containerStyle, containerStyles.container]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: 'contain',
    source: _icon.default[icon],
    style: [{
      tintColor: color ?? colors.primary
    }, sizeStyle, style]
  }));
};
const FileIcon = _ref2 => {
  let {
    fileType,
    ...props
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(Icon, _extends({
    icon: (0, _uikitUtils.getFileIconFromMessageType)((0, _uikitUtils.convertFileTypeToMessageType)(fileType))
  }, props));
};
const containerStyles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const sizeStyles = (0, _createStyleSheet.default)({
  16: {
    width: 16,
    height: 16
  },
  20: {
    width: 20,
    height: 20
  },
  24: {
    width: 24,
    height: 24
  },
  28: {
    width: 28,
    height: 28
  },
  32: {
    width: 32,
    height: 32
  }
});
var _default = Object.assign(Icon, {
  Assets: _icon.default,
  File: FileIcon
});
exports.default = _default;
//# sourceMappingURL=index.js.map