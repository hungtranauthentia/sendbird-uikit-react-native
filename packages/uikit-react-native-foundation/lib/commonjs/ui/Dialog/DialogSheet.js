"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DialogSheet = _ref => {
  let {
    style,
    children
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: colors.ui.dialog.default.none.background
    }, style]
  }, children);
};
const SheetItem = _ref2 => {
  let {
    icon,
    title,
    iconColor,
    titleColor,
    disabled = false
  } = _ref2;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.sheetItemContainer, {
      backgroundColor: colors.ui.dialog.default.none.background
    }]
  }, icon && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: icon,
    color: iconColor ?? (disabled ? colors.ui.dialog.default.none.blurred : colors.ui.dialog.default.none.highlight),
    containerStyle: styles.sheetItemIcon
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    subtitle1: true,
    numberOfLines: 1,
    color: titleColor ?? (disabled ? colors.ui.dialog.default.none.blurred : colors.ui.dialog.default.none.text),
    style: styles.sheetItemText
  }, title));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    overflow: 'hidden',
    flexDirection: 'column',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  sheetItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48
  },
  sheetItemIcon: {
    marginLeft: 16
  },
  sheetItemText: {
    flex: 1,
    marginHorizontal: 24
  }
});
DialogSheet.Item = SheetItem;
var _default = DialogSheet;
exports.default = _default;
//# sourceMappingURL=DialogSheet.js.map