"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Modal = _interopRequireDefault(require("../../components/Modal"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _TextInput = _interopRequireDefault(require("../../components/TextInput"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useHeaderStyle = _interopRequireDefault(require("../../styles/useHeaderStyle"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Button = _interopRequireDefault(require("../Button"));
var _DialogBox = _interopRequireDefault(require("../Dialog/DialogBox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Prompt = _ref => {
  let {
    onDismiss,
    visible,
    onHide,
    autoFocus = true,
    title,
    defaultValue = '',
    placeholder = 'Enter',
    onSubmit = _uikitUtils.NOOP,
    onCancel = _uikitUtils.NOOP,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel'
  } = _ref;
  const {
    statusBarTranslucent
  } = (0, _useHeaderStyle.default)();
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const inputRef = (0, _react.useRef)(null);
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const buttons = [{
    text: cancelLabel,
    onPress: onCancel
  }, {
    text: submitLabel,
    onPress: () => onSubmit(text)
  }];
  const [text, setText] = (0, _react.useState)(defaultValue);

  // FIXME: autoFocus trick with modal
  // Android
  // - InputProps.autoFocus is not trigger keyboard appearing.
  // - InputRef.focus() is trigger keyboard appearing, but position of keyboard selection is always the start of text.
  // iOS
  // - InputProps.autoFocus is trigger weird UI behavior on landscape mode.
  (0, _react.useEffect)(() => {
    if (autoFocus && visible) {
      setTimeout(() => {
        var _inputRef$current, _inputRef$current2;
        if (_reactNative.Platform.OS === 'android') (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
      }, 250);
    }
  }, [autoFocus, visible, `${width}-${height}`]);
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    enableKeyboardAvoid: true,
    disableBackgroundClose: true,
    onClose: onHide,
    onDismiss: () => {
      setText('');
      onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
    },
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
    style: styles.inputContainer
  }, /*#__PURE__*/_react.default.createElement(_TextInput.default, {
    autoFocus: autoFocus && _reactNative.Platform.OS === 'android',
    ref: inputRef,
    placeholder: placeholder,
    variant: 'underline',
    value: text,
    onChangeText: setText,
    style: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 10,
      paddingBottom: 10
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, buttons.map((_ref2, index) => {
    let {
      text,
      onPress
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      key: text + index,
      variant: 'text',
      style: styles.button,
      contentColor: colors.ui.dialog.default.none.highlight,
      onPress: () => {
        _reactNative.Keyboard.dismiss();
        try {
          onPress === null || onPress === void 0 ? void 0 : onPress();
        } finally {
          onHide();
        }
      }
    }, text);
  }))));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    paddingTop: 8
  },
  titleContainer: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    paddingHorizontal: 24,
    marginBottom: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12
  },
  button: {
    marginLeft: 8
  }
});
var _default = Prompt;
exports.default = _default;
//# sourceMappingURL=index.js.map