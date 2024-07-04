"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelNotificationsHeader = _interopRequireDefault(require("../component/GroupChannelNotificationsHeader"));
var _GroupChannelNotificationsView = _interopRequireDefault(require("../component/GroupChannelNotificationsView"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelNotificationsModule = function () {
  let {
    Header = _GroupChannelNotificationsHeader.default,
    View = _GroupChannelNotificationsView.default,
    Provider = _moduleContext.GroupChannelNotificationsContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    View,
    Provider,
    ...module
  };
};
var _default = createGroupChannelNotificationsModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelNotificationsModule.js.map