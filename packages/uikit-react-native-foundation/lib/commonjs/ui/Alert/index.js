"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Modal = _interopRequireDefault(require("../../components/Modal"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useHeaderStyle = _interopRequireDefault(require("../../styles/useHeaderStyle"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Button = _interopRequireDefault(require("../Button"));
var _DialogBox = _interopRequireDefault(require("../Dialog/DialogBox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Alert = _ref => {
  let {
    onDismiss,
    visible,
    onHide,
    title = '',
    message = '',
    buttons = [{
      text: 'OK'
    }]
  } = _ref;
  const {
    statusBarTranslucent
  } = (0, _useHeaderStyle.default)();
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    onClose: onHide,
    onDismiss: onDismiss,
    statusBarTranslucent: statusBarTranslucent,
    visible: visible,
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_DialogBox.default, {
    style: styles.container
  }, Boolean(title) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContainer
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    h1: true,
    color: colors.ui.dialog.default.none.text,
    numberOfLines: 1,
    style: {
      flex: 1
    }
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, Boolean(message) && /*#__PURE__*/_react.default.createElement(_Text.default, {
    subtitle2: !title,
    body3: Boolean(title),
    color: !title ? colors.ui.dialog.default.none.text : colors.ui.dialog.default.none.message,
    numberOfLines: 3
  }, message)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, buttons.map((_ref2, index) => {
    let {
      text = 'OK',
      style = 'default',
      onPress
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      key: text + index,
      variant: 'text',
      style: styles.button,
      onPress: async () => {
        try {
          onPress === null || onPress === void 0 ? void 0 : onPress();
        } finally {
          onHide();
        }
      },
      contentColor: style === 'destructive' ? colors.ui.dialog.default.none.destructive : colors.ui.dialog.default.none.highlight
    }, text);
  }))));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    paddingTop: 20
  },
  titleContainer: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  messageContainer: {
    paddingHorizontal: 24,
    marginBottom: 12
  },
  button: {
    marginLeft: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12
  }
});
var _default = Alert;
exports.default = _default;
//# sourceMappingURL=index.js.map