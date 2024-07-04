"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TypedPlaceholder = _ref => {
  let {
    type,
    onPressRetry
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  switch (type) {
    case 'no-banned-users':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'ban',
        message: STRINGS.PLACEHOLDER.NO_BANNED_USERS
      });
    case 'no-channels':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'chat',
        message: STRINGS.PLACEHOLDER.NO_CHANNELS
      });
    case 'no-messages':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'message',
        message: STRINGS.PLACEHOLDER.NO_MESSAGES
      });
    case 'no-muted-members':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'mute',
        message: STRINGS.PLACEHOLDER.NO_MUTED_MEMBERS
      });
    case 'no-muted-participants':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'mute',
        message: STRINGS.PLACEHOLDER.NO_MUTED_PARTICIPANTS
      });
    case 'no-results-found':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'search',
        message: STRINGS.PLACEHOLDER.NO_RESULTS_FOUND
      });
    case 'no-users':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'members',
        message: STRINGS.PLACEHOLDER.NO_USERS
      });
    case 'error-wrong':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        icon: 'error',
        message: STRINGS.PLACEHOLDER.ERROR.MESSAGE,
        errorRetryLabel: STRINGS.PLACEHOLDER.ERROR.RETRY_LABEL,
        onPressRetry: onPressRetry
      });
    case 'loading':
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Placeholder, {
        loading: true,
        icon: 'spinner'
      });
  }
};
var _default = TypedPlaceholder;
exports.default = _default;
//# sourceMappingURL=TypedPlaceholder.js.map