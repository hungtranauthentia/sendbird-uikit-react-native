"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ChannelCover = _interopRequireDefault(require("../../../components/ChannelCover"));
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelSettingsInfo = _ => {
  const {
    channel
  } = (0, _react.useContext)(_moduleContext.GroupChannelSettingsContexts.Fragment);
  const {
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.userInfoContainer
  }, /*#__PURE__*/_react.default.createElement(_ChannelCover.default, {
    channel: channel,
    size: 80,
    containerStyle: styles.avatarContainer
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    h1: true,
    numberOfLines: 1
  }, (0, _uikitUtils.getGroupChannelTitle)((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) || '', channel, STRINGS.LABELS.USER_NO_NAME, STRINGS.LABELS.CHANNEL_NO_MEMBERS) || ' ')), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Divider, null));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    flex: 1
  },
  userInfoContainer: {
    paddingVertical: 24,
    alignItems: 'center'
  },
  avatarContainer: {
    marginBottom: 12
  },
  userIdContainer: {
    paddingVertical: 16
  },
  userIdLabel: {
    marginBottom: 4
  }
});
var _default = GroupChannelSettingsInfo;
exports.default = _default;
//# sourceMappingURL=GroupChannelSettingsInfo.js.map