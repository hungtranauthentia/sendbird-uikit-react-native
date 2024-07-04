"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelListHeader = _interopRequireDefault(require("../component/OpenChannelListHeader"));
var _OpenChannelListList = _interopRequireDefault(require("../component/OpenChannelListList"));
var _OpenChannelListStatusEmpty = _interopRequireDefault(require("../component/OpenChannelListStatusEmpty"));
var _OpenChannelListStatusError = _interopRequireDefault(require("../component/OpenChannelListStatusError"));
var _OpenChannelListStatusLoading = _interopRequireDefault(require("../component/OpenChannelListStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelListModule = function () {
  let {
    Header = _OpenChannelListHeader.default,
    List = _OpenChannelListList.default,
    StatusLoading = _OpenChannelListStatusLoading.default,
    StatusEmpty = _OpenChannelListStatusEmpty.default,
    StatusError = _OpenChannelListStatusError.default,
    Provider = _moduleContext.OpenChannelListContextsProvider,
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
var _default = createOpenChannelListModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelListModule.js.map