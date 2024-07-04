"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelBannedUsersHeader = _interopRequireDefault(require("../component/GroupChannelBannedUsersHeader"));
var _GroupChannelBannedUsersList = _interopRequireDefault(require("../component/GroupChannelBannedUsersList"));
var _GroupChannelBannedUsersStatusEmpty = _interopRequireDefault(require("../component/GroupChannelBannedUsersStatusEmpty"));
var _GroupChannelBannedUsersStatusError = _interopRequireDefault(require("../component/GroupChannelBannedUsersStatusError"));
var _GroupChannelBannedUsersStatusLoading = _interopRequireDefault(require("../component/GroupChannelBannedUsersStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelBannedUsersModule = function () {
  let {
    Header = _GroupChannelBannedUsersHeader.default,
    List = _GroupChannelBannedUsersList.default,
    StatusLoading = _GroupChannelBannedUsersStatusLoading.default,
    StatusEmpty = _GroupChannelBannedUsersStatusEmpty.default,
    StatusError = _GroupChannelBannedUsersStatusError.default,
    Provider = _moduleContext.GroupChannelBannedUsersContextsProvider,
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
var _default = createGroupChannelBannedUsersModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelBannedUsersModule.js.map