"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelMutedMembersHeader = _interopRequireDefault(require("../component/GroupChannelMutedMembersHeader"));
var _GroupChannelMutedMembersList = _interopRequireDefault(require("../component/GroupChannelMutedMembersList"));
var _GroupChannelMutedMembersStatusEmpty = _interopRequireDefault(require("../component/GroupChannelMutedMembersStatusEmpty"));
var _GroupChannelMutedMembersStatusError = _interopRequireDefault(require("../component/GroupChannelMutedMembersStatusError"));
var _GroupChannelMutedMembersStatusLoading = _interopRequireDefault(require("../component/GroupChannelMutedMembersStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelMutedMembersModule = function () {
  let {
    Header = _GroupChannelMutedMembersHeader.default,
    List = _GroupChannelMutedMembersList.default,
    StatusEmpty = _GroupChannelMutedMembersStatusEmpty.default,
    StatusError = _GroupChannelMutedMembersStatusError.default,
    StatusLoading = _GroupChannelMutedMembersStatusLoading.default,
    Provider = _moduleContext.GroupChannelMutedMembersContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    Provider,
    StatusEmpty,
    StatusError,
    StatusLoading,
    ...module
  };
};
var _default = createGroupChannelMutedMembersModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelMutedMembersModule.js.map