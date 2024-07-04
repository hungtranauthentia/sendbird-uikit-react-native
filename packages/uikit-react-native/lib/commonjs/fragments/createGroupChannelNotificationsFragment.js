"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _groupChannelNotifications = require("../domain/groupChannelNotifications");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelNotificationsFragment = initModule => {
  const GroupChannelNotificationsModule = (0, _groupChannelNotifications.createGroupChannelNotificationsModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      channel
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(GroupChannelNotificationsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/_react.default.createElement(GroupChannelNotificationsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/_react.default.createElement(GroupChannelNotificationsModule.View, null));
  };
};
var _default = createGroupChannelNotificationsFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelNotificationsFragment.js.map