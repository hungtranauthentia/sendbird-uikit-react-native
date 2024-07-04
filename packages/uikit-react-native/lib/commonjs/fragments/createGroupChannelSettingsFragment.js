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
var _createGroupChannelSettingsModule = _interopRequireDefault(require("../domain/groupChannelSettings/module/createGroupChannelSettingsModule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelSettingsFragment = initModule => {
  const GroupChannelSettingsModule = (0, _createGroupChannelSettingsModule.default)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      channel,
      onPressMenuModeration,
      onPressMenuMembers,
      onPressMenuSearchInChannel,
      onPressMenuLeaveChannel,
      onPressMenuNotification,
      menuItemsCreator
    } = _ref;
    const {
      colors
    } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
    const {
      left,
      right
    } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
    return /*#__PURE__*/_react.default.createElement(GroupChannelSettingsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(GroupChannelSettingsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        backgroundColor: colors.background
      },
      contentContainerStyle: {
        paddingLeft: left + styles.viewContainer.paddingHorizontal,
        paddingRight: right + styles.viewContainer.paddingHorizontal
      }
    }, /*#__PURE__*/_react.default.createElement(GroupChannelSettingsModule.Info, null), /*#__PURE__*/_react.default.createElement(GroupChannelSettingsModule.Menu, {
      menuItemsCreator: menuItemsCreator,
      onPressMenuModeration: onPressMenuModeration,
      onPressMenuMembers: onPressMenuMembers,
      onPressMenuSearchInChannel: onPressMenuSearchInChannel,
      onPressMenuLeaveChannel: onPressMenuLeaveChannel,
      onPressMenuNotification: onPressMenuNotification
    })));
  };
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  viewContainer: {
    paddingHorizontal: 16
  }
});
var _default = createGroupChannelSettingsFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelSettingsFragment.js.map