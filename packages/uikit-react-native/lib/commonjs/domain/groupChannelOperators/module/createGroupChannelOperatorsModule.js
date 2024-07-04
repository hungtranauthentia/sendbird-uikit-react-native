"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelOperatorsHeader = _interopRequireDefault(require("../component/GroupChannelOperatorsHeader"));
var _GroupChannelOperatorsList = _interopRequireDefault(require("../component/GroupChannelOperatorsList"));
var _GroupChannelOperatorsStatusEmpty = _interopRequireDefault(require("../component/GroupChannelOperatorsStatusEmpty"));
var _GroupChannelOperatorsStatusError = _interopRequireDefault(require("../component/GroupChannelOperatorsStatusError"));
var _GroupChannelOperatorsStatusLoading = _interopRequireDefault(require("../component/GroupChannelOperatorsStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelOperatorsModule = function () {
  let {
    Header = _GroupChannelOperatorsHeader.default,
    List = _GroupChannelOperatorsList.default,
    StatusEmpty = _GroupChannelOperatorsStatusEmpty.default,
    StatusError = _GroupChannelOperatorsStatusError.default,
    StatusLoading = _GroupChannelOperatorsStatusLoading.default,
    Provider = _moduleContext.GroupChannelOperatorsContextsProvider,
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
var _default = createGroupChannelOperatorsModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelOperatorsModule.js.map