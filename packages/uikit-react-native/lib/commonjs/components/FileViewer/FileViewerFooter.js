"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FileViewerFooter = _ref => {
  let {
    bottomInset,
    deleteShown,
    onPressDelete,
    onPressDownload
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
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: [styles.container, {
      paddingLeft: styles.container.paddingHorizontal + left,
      paddingRight: styles.container.paddingHorizontal + right,
      paddingBottom: bottomInset,
      height: defaultHeight + bottomInset,
      backgroundColor: palette.overlay01
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    activeOpacity: 0.75,
    onPress: onPressDownload,
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'download',
    size: 24,
    color: palette.onBackgroundDark01
  })), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.titleContainer
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    activeOpacity: 0.75,
    onPress: onPressDelete,
    style: styles.buttonContainer,
    disabled: !deleteShown
  }, deleteShown && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'delete',
    size: 24,
    color: palette.onBackgroundDark01
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
  }
});
var _default = FileViewerFooter;
exports.default = _default;
//# sourceMappingURL=FileViewerFooter.js.map