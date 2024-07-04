"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserListHeader = _interopRequireDefault(require("../component/UserListHeader"));
var _UserListList = _interopRequireDefault(require("../component/UserListList"));
var _UserListStatusEmpty = _interopRequireDefault(require("../component/UserListStatusEmpty"));
var _UserListStatusError = _interopRequireDefault(require("../component/UserListStatusError"));
var _UserListStatusLoading = _interopRequireDefault(require("../component/UserListStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createUserListModule = function () {
  let {
    Header = _UserListHeader.default,
    List = _UserListList.default,
    StatusLoading = _UserListStatusLoading.default,
    StatusEmpty = _UserListStatusEmpty.default,
    StatusError = _UserListStatusError.default,
    Provider = _moduleContext.UserListContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    StatusLoading,
    StatusEmpty,
    StatusError,
    Provider,
    ...module
  };
};
var _default = createUserListModule;
exports.default = _default;
//# sourceMappingURL=createUserListModule.js.map