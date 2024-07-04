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
var _openChannelModeration = require("../domain/openChannelModeration");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelModerationFragment = initModule => {
  const OpenChannelModerationModule = (0, _openChannelModeration.createOpenChannelModerationModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      channel,
      onPressMenuMutedParticipants,
      onPressMenuOperators,
      menuItemsCreator,
      onPressMenuBannedUsers
    } = _ref;
    const {
      left,
      right
    } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      colors
    } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
    return /*#__PURE__*/_react.default.createElement(OpenChannelModerationModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(OpenChannelModerationModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/_react.default.createElement(OpenChannelModerationModule.Menu, {
      onPressMenuOperators: onPressMenuOperators,
      onPressMenuMutedParticipants: onPressMenuMutedParticipants,
      onPressMenuBannedUsers: onPressMenuBannedUsers,
      menuItemsCreator: menuItemsCreator
    })));
  };
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  viewContainer: {
    paddingHorizontal: 16
  }
});
var _default = createOpenChannelModerationFragment;
exports.default = _default;
//# sourceMappingURL=createOpenChannelModerationFragment.js.map