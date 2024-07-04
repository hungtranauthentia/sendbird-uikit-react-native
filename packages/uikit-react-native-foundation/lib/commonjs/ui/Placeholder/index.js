"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Button = _interopRequireDefault(require("../Button"));
var _LoadingSpinner = _interopRequireDefault(require("../LoadingSpinner"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Placeholder = _ref => {
  let {
    icon,
    loading = false,
    message = '',
    errorRetryLabel,
    onPressRetry
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();

  // loading ? styles.containerLoading : errorRetryLabel ? styles.containerError : styles.container
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: (0, _uikitUtils.conditionChaining)([loading, errorRetryLabel], [styles.containerLoading, styles.containerError, styles.container])
  }, (0, _uikitUtils.conditionChaining)([loading], [/*#__PURE__*/_react.default.createElement(_LoadingSpinner.default, {
    size: 64,
    color: colors.ui.placeholder.default.none.highlight
  }), /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: icon,
    size: 64,
    color: colors.ui.placeholder.default.none.content
  })]), Boolean(message) && !loading && /*#__PURE__*/_react.default.createElement(_Text.default, {
    body3: true,
    color: colors.ui.placeholder.default.none.content
  }, message), Boolean(errorRetryLabel) && !loading && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: 'text',
    onPress: onPressRetry,
    contentColor: colors.ui.placeholder.default.none.highlight,
    icon: 'refresh'
  }, errorRetryLabel));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerError: {
    width: 200,
    height: 148,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerLoading: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
var _default = Placeholder;
exports.default = _default;
//# sourceMappingURL=index.js.map