"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FileViewerHeader = _ref => {
  let {
    headerShown = true,
    topInset,
    onClose,
    subtitle,
    title
  } = _ref;
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    defaultHeight
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  if (!headerShown) return null;
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: [styles.container, {
      paddingLeft: styles.container.paddingHorizontal + left,
      paddingRight: styles.container.paddingHorizontal + right,
      paddingTop: topInset,
      height: defaultHeight + topInset,
      backgroundColor: palette.overlay01
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    activeOpacity: 0.75,
    onPress: onClose,
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'close',
    size: 24,
    color: palette.onBackgroundDark01
  })), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.titleContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    h2: true,
    color: palette.onBackgroundDark01,
    style: styles.title,
    numberOfLines: 1
  }, (0, _uikitUtils.truncate)(title, {
    mode: 'mid',
    maxLen: 18
  })), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption2: true,
    color: palette.onBackgroundDark01,
    numberOfLines: 1
  }, subtitle)), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.buttonContainer
  }));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  buttonContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 2
  }
});
var _default = FileViewerHeader;
exports.default = _default;
//# sourceMappingURL=FileViewerHeader.js.map