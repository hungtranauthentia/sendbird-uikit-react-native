"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _openChannelSettings = require("../domain/openChannelSettings");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelSettingsFragment = initModule => {
  const OpenChannelSettingsModule = (0, _openChannelSettings.createOpenChannelSettingsModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      channel,
      onPressMenuModeration,
      onPressMenuParticipants,
      onPressMenuDeleteChannel,
      onNavigateToOpenChannel,
      menuItemsCreator
    } = _ref;
    const {
      colors
    } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
    const {
      left,
      right
    } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    return /*#__PURE__*/_react.default.createElement(OpenChannelSettingsModule.Provider, {
      channel: channel,
      onNavigateToOpenChannel: onNavigateToOpenChannel
    }, /*#__PURE__*/_react.default.createElement(OpenChannelSettingsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/_react.default.createElement(OpenChannelSettingsModule.Info, null), /*#__PURE__*/_react.default.createElement(OpenChannelSettingsModule.Menu, {
      menuItemsCreator: menuItemsCreator,
      onPressMenuModeration: onPressMenuModeration,
      onPressMenuParticipants: onPressMenuParticipants,
      onPressMenuDeleteChannel: onPressMenuDeleteChannel
    })));
  };
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  viewContainer: {
    paddingHorizontal: 16
  }
});
var _default = createOpenChannelSettingsFragment;
exports.default = _default;
//# sourceMappingURL=createOpenChannelSettingsFragment.js.map