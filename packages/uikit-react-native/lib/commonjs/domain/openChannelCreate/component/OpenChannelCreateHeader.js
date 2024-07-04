"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _moduleContext = require("../module/moduleContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OpenChannelCreateHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight,
    shouldActivateHeaderRight
  } = _ref;
  const {
    headerTitle,
    headerRight
  } = (0, _react.useContext)(_moduleContext.OpenChannelCreateContexts.Fragment);
  const {
    HeaderComponent
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const isHeaderRightActive = shouldActivateHeaderRight();
  return /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    title: headerTitle,
    left: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
      button: true,
      color: (0, _uikitUtils.ifThenOr)(isHeaderRightActive, colors.primary, colors.onBackground04)
    }, headerRight),
    onPressRight: (0, _uikitUtils.ifThenOr)(isHeaderRightActive, onPressHeaderRight)
  });
};
var _default = OpenChannelCreateHeader;
exports.default = _default;
//# sourceMappingURL=OpenChannelCreateHeader.js.map