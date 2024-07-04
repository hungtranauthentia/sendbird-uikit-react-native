"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MessageSearchHeader = _ref => {
  let {
    keyword,
    onChangeKeyword,
    onPressHeaderLeft,
    onPressHeaderRight
  } = _ref;
  const {
    HeaderComponent
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const inputRef = (0, _react.useRef)(null);
  const inputColor = colors.ui.input.default.active;
  const searchEnabled = keyword.length > 0;
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }, _reactNative.Platform.select({
      ios: 500,
      default: 0
    }));
  }, []);
  return /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    clearTitleMargin: true,
    title: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      flex: 1,
      height: 36,
      alignItems: 'center',
      backgroundColor: inputColor.background,
      borderRadius: 24,
      paddingHorizontal: 10,
      flexDirection: 'row'
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      size: 24,
      icon: 'search',
      color: colors.onBackground03,
      containerStyle: styles.searchIcon
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      disableFullscreenUI: true,
      enablesReturnKeyAutomatically: true,
      ref: inputRef,
      returnKeyType: 'search',
      onSubmitEditing: () => onPressHeaderRight(),
      selectionColor: colors.primary,
      placeholder: STRINGS.MESSAGE_SEARCH.HEADER_INPUT_PLACEHOLDER,
      placeholderTextColor: inputColor.placeholder,
      style: [styles.input, {
        color: inputColor.text
      }],
      value: keyword,
      onChangeText: onChangeKeyword
    }), searchEnabled && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
      onPress: () => onChangeKeyword('')
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      size: 18,
      icon: 'remove',
      color: colors.onBackground03,
      containerStyle: styles.clearIcon
    }))),
    left: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
      button: true,
      color: searchEnabled ? colors.primary : colors.onBackground04
    }, STRINGS.MESSAGE_SEARCH.HEADER_RIGHT),
    onPressRight: searchEnabled ? onPressHeaderRight : undefined
  });
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  searchIcon: {
    marginRight: 8
  },
  clearIcon: {
    marginLeft: 8
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0
  }
});
var _default = MessageSearchHeader;
exports.default = _default;
//# sourceMappingURL=MessageSearchHeader.js.map