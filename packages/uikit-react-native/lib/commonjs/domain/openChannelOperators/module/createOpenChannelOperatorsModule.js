"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelOperatorsHeader = _interopRequireDefault(require("../component/OpenChannelOperatorsHeader"));
var _OpenChannelOperatorsList = _interopRequireDefault(require("../component/OpenChannelOperatorsList"));
var _OpenChannelOperatorsStatusEmpty = _interopRequireDefault(require("../component/OpenChannelOperatorsStatusEmpty"));
var _OpenChannelOperatorsStatusError = _interopRequireDefault(require("../component/OpenChannelOperatorsStatusError"));
var _OpenChannelOperatorsStatusLoading = _interopRequireDefault(require("../component/OpenChannelOperatorsStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelOperatorsModule = function () {
  let {
    Header = _OpenChannelOperatorsHeader.default,
    List = _OpenChannelOperatorsList.default,
    StatusLoading = _OpenChannelOperatorsStatusLoading.default,
    StatusEmpty = _OpenChannelOperatorsStatusEmpty.default,
    StatusError = _OpenChannelOperatorsStatusError.default,
    Provider = _moduleContext.OpenChannelOperatorsContextsProvider,
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
var _default = createOpenChannelOperatorsModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelOperatorsModule.js.map