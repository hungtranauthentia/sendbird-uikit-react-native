"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelBannedUsersHeader = _interopRequireDefault(require("../component/OpenChannelBannedUsersHeader"));
var _OpenChannelBannedUsersList = _interopRequireDefault(require("../component/OpenChannelBannedUsersList"));
var _OpenChannelBannedUsersStatusEmpty = _interopRequireDefault(require("../component/OpenChannelBannedUsersStatusEmpty"));
var _OpenChannelBannedUsersStatusError = _interopRequireDefault(require("../component/OpenChannelBannedUsersStatusError"));
var _OpenChannelBannedUsersStatusLoading = _interopRequireDefault(require("../component/OpenChannelBannedUsersStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelBannedUsersModule = function () {
  let {
    Header = _OpenChannelBannedUsersHeader.default,
    List = _OpenChannelBannedUsersList.default,
    StatusLoading = _OpenChannelBannedUsersStatusLoading.default,
    StatusEmpty = _OpenChannelBannedUsersStatusEmpty.default,
    StatusError = _OpenChannelBannedUsersStatusError.default,
    Provider = _moduleContext.OpenChannelBannedUsersContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    Provider,
    StatusEmpty,
    StatusLoading,
    StatusError,
    ...module
  };
};
var _default = createOpenChannelBannedUsersModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelBannedUsersModule.js.map