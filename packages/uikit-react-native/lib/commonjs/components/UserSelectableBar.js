"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSelectableBar = _ref => {
  let {
    uri,
    name,
    selected,
    disabled
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const iconColor = (0, _uikitUtils.conditionChaining)([disabled, selected], [colors.onBackground04, colors.primary, colors.onBackground03]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
    size: 36,
    uri: uri,
    containerStyle: styles.avatar
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.infoContainer, {
      borderBottomColor: colors.onBackground04
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    subtitle2: true,
    numberOfLines: 1,
    style: styles.name,
    color: colors.onBackground01
  }, name), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: iconColor,
    size: 24,
    icon: selected ? 'checkbox-on' : 'checkbox-off'
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    paddingHorizontal: 16
  },
  avatar: {
    marginRight: 16
  },
  infoContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1
  },
  name: {
    flex: 1,
    marginRight: 8
  }
});
var _default = UserSelectableBar;
exports.default = _default;
//# sourceMappingURL=UserSelectableBar.js.map