"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelListHeader = _interopRequireDefault(require("../component/GroupChannelListHeader"));
var _GroupChannelListList = _interopRequireDefault(require("../component/GroupChannelListList"));
var _GroupChannelListStatusEmpty = _interopRequireDefault(require("../component/GroupChannelListStatusEmpty"));
var _GroupChannelListStatusLoading = _interopRequireDefault(require("../component/GroupChannelListStatusLoading"));
var _GroupChannelListTypeSelector = _interopRequireDefault(require("../component/GroupChannelListTypeSelector"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelListModule = function () {
  let {
    Header = _GroupChannelListHeader.default,
    List = _GroupChannelListList.default,
    TypeSelector = _GroupChannelListTypeSelector.default,
    StatusLoading = _GroupChannelListStatusLoading.default,
    StatusEmpty = _GroupChannelListStatusEmpty.default,
    Provider = _moduleContext.GroupChannelListContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    TypeSelector,
    StatusLoading,
    StatusEmpty,
    Provider,
    ...module
  };
};
var _default = createGroupChannelListModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelListModule.js.map