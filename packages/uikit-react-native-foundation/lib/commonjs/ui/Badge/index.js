"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Badge = _ref => {
  let {
    count,
    maxCount,
    badgeColor,
    textColor,
    style,
    size = 'default'
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const isSmall = size === 'small';
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [isSmall ? styles.badgeSmall : styles.badgeDefault, {
      backgroundColor: badgeColor ?? colors.ui.badge.default.none.background
    }, count >= 10 && (isSmall ? styles.badgeSmallPadding : styles.badgeDefaultPadding), style]
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption1: true,
    color: textColor ?? colors.ui.badge.default.none.text
  }, (0, _uikitUtils.truncatedCount)(count, maxCount)));
};
const styles = (0, _createStyleSheet.default)({
  badgeDefault: {
    paddingTop: _reactNative.Platform.select({
      ios: 2,
      android: 2
    }),
    minWidth: 20,
    minHeight: 20,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeDefaultPadding: {
    paddingHorizontal: 8
  },
  badgeSmall: {
    paddingTop: _reactNative.Platform.select({
      ios: 3,
      android: 2
    }),
    minWidth: 16,
    minHeight: 16,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeSmallPadding: {
    paddingHorizontal: 4
  }
});
var _default = Badge;
exports.default = _default;
//# sourceMappingURL=index.js.map