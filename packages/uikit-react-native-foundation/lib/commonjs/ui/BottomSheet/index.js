"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Modal = _interopRequireDefault(require("../../components/Modal"));
var _useHeaderStyle = _interopRequireDefault(require("../../styles/useHeaderStyle"));
var _DialogSheet = _interopRequireDefault(require("../Dialog/DialogSheet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BottomSheet = _ref => {
  let {
    onDismiss,
    onHide,
    visible,
    sheetItems,
    HeaderComponent
  } = _ref;
  const {
    statusBarTranslucent
  } = (0, _useHeaderStyle.default)();
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    bottom,
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    type: 'slide',
    onClose: onHide,
    onDismiss: onDismiss,
    statusBarTranslucent: statusBarTranslucent,
    visible: visible,
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/_react.default.createElement(_DialogSheet.default, {
    style: {
      width,
      paddingBottom: bottom
    }
  }, HeaderComponent && /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    onClose: onHide
  }), sheetItems.map((_ref2, idx) => {
    let {
      onPress,
      ...props
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      activeOpacity: 0.75,
      key: props.title + idx,
      style: {
        paddingLeft: left,
        paddingRight: right
      },
      disabled: props.disabled,
      onPress: async () => {
        await onHide();
        try {
          onPress();
        } catch {}
      }
    }, /*#__PURE__*/_react.default.createElement(_DialogSheet.default.Item, props));
  })));
};
var _default = BottomSheet;
exports.default = _default;
//# sourceMappingURL=index.js.map