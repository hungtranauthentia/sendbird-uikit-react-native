"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderStyleProvider = exports.HeaderStyleContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _getDefaultHeaderHeight = _interopRequireDefault(require("./getDefaultHeaderHeight"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HeaderStyleContext = /*#__PURE__*/_react.default.createContext({
  HeaderComponent: () => null,
  defaultTitleAlign: 'left',
  statusBarTranslucent: true,
  topInset: _reactNative.StatusBar.currentHeight ?? 0,
  defaultHeight: (0, _getDefaultHeaderHeight.default)(false)
});
exports.HeaderStyleContext = HeaderStyleContext;
const HeaderStyleProvider = _ref => {
  let {
    children,
    HeaderComponent = () => null,
    defaultTitleAlign,
    statusBarTranslucent
  } = _ref;
  const {
    top
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  return /*#__PURE__*/_react.default.createElement(HeaderStyleContext.Provider, {
    value: {
      HeaderComponent,
      defaultTitleAlign,
      statusBarTranslucent,
      topInset: statusBarTranslucent ? top : 0,
      defaultHeight: (0, _getDefaultHeaderHeight.default)(width > height)
    }
  }, children);
};
exports.HeaderStyleProvider = HeaderStyleProvider;
//# sourceMappingURL=HeaderStyleContext.js.map