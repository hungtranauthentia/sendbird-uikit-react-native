"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ChannelCover = _ref => {
  let {
    channel,
    ...avatarProps
  } = _ref;
  const {
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (channel.isGroupChannel()) {
    // custom channel cover
    if (!(0, _uikitUtils.isDefaultCoverImage)(channel.coverUrl) || !currentUser) {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, _extends({
        uri: channel.coverUrl
      }, avatarProps));
    }

    // broadcast channel cover
    if (channel.isBroadcast) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: avatarProps.containerStyle
      }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
        icon: 'broadcast',
        size: avatarProps.size * (4 / 7),
        color: colors.onBackgroundReverse01,
        containerStyle: {
          backgroundColor: colors.secondary,
          borderRadius: avatarProps.size * 0.5,
          padding: avatarProps.size * (3 / 7) * 0.5
        }
      }));
    }

    // no members, use anonymous profile
    if (channel.memberCount <= 1) {
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, avatarProps);
    }

    // 1:1, use member profile
    if (channel.memberCount === 2) {
      var _channel$members$filt, _channel$members$filt2;
      const otherUserProfile = (_channel$members$filt = channel.members.filter(m => m.userId !== currentUser.userId)) === null || _channel$members$filt === void 0 ? void 0 : (_channel$members$filt2 = _channel$members$filt[0]) === null || _channel$members$filt2 === void 0 ? void 0 : _channel$members$filt2.profileUrl;
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, _extends({
        uri: otherUserProfile
      }, avatarProps));
    }

    // group, use members profile
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar.Group, avatarProps, (0, _uikitUtils.getMembersExcludeMe)(channel, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId).map(m => /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
      key: m.userId,
      uri: m.profileUrl
    })));
  }
  if (channel.isOpenChannel()) {
    // channel cover
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, _extends({
      uri: channel.coverUrl
    }, avatarProps));
  }
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, _extends({
    uri: channel.coverUrl
  }, avatarProps));
};
var _default = ChannelCover;
exports.default = _default;
//# sourceMappingURL=ChannelCover.js.map