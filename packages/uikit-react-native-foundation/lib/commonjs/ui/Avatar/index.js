"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Image = _interopRequireDefault(require("../../components/Image"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _AvatarGroup = _interopRequireDefault(require("./AvatarGroup"));
var _AvatarIcon = _interopRequireDefault(require("./AvatarIcon"));
var _AvatarStack = _interopRequireDefault(require("./AvatarStack"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Avatar = _ref => {
  let {
    uri,
    square,
    muted = false,
    size = 56,
    containerStyle
  } = _ref;
  const {
    colors,
    palette
  } = (0, _useUIKitTheme.default)();
  const [loadFailure, setLoadFailure] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width: size,
      height: size,
      borderRadius: square ? 0 : size / 2,
      backgroundColor: palette.background300
    }, containerStyle]
  }, (0, _uikitUtils.conditionChaining)([Boolean(uri) && !loadFailure], [/*#__PURE__*/_react.default.createElement(_Image.default, {
    onError: () => setLoadFailure(true),
    source: {
      uri
    },
    resizeMode: 'cover',
    style: _reactNative.StyleSheet.absoluteFill
  }), /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: 'user',
    size: size / 2,
    color: colors.onBackgroundReverse01
  })]), muted && /*#__PURE__*/_react.default.createElement(MutedOverlay, {
    size: size
  }));
};
const MutedOverlay = _ref2 => {
  let {
    size
  } = _ref2;
  const {
    palette
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, _reactNative.StyleSheet.absoluteFill]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      backgroundColor: palette.primary300,
      opacity: 0.5
    }]
  }), /*#__PURE__*/_react.default.createElement(_Icon.default, {
    color: palette.onBackgroundDark01,
    icon: 'mute',
    size: size * 0.72
  }));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});
var _default = Object.assign(Avatar, {
  Group: _AvatarGroup.default,
  Icon: _AvatarIcon.default,
  Stack: _AvatarStack.default
});
exports.default = _default;
//# sourceMappingURL=index.js.map