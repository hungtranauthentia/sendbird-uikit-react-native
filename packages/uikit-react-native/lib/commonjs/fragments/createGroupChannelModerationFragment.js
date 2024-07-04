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
var _groupChannelModeration = require("../domain/groupChannelModeration");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelModerationFragment = initModule => {
  const GroupChannelModerationModule = (0, _groupChannelModeration.createGroupChannelModerationModule)(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft = _uikitUtils.NOOP,
      onPressMenuBannedUsers,
      onPressMenuMutedMembers,
      onPressMenuOperators,
      menuItemsCreator
    } = _ref;
    const {
      left,
      right
    } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    const {
      colors
    } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
    return /*#__PURE__*/_react.default.createElement(GroupChannelModerationModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(GroupChannelModerationModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/_react.default.createElement(GroupChannelModerationModule.Menu, {
      onPressMenuBannedUsers: onPressMenuBannedUsers,
      onPressMenuMutedMembers: onPressMenuMutedMembers,
      onPressMenuOperators: onPressMenuOperators,
      menuItemsCreator: menuItemsCreator
    })));
  };
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  viewContainer: {
    paddingHorizontal: 16
  }
});
var _default = createGroupChannelModerationFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelModerationFragment.js.map