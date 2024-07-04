"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelHeader = _interopRequireDefault(require("../component/OpenChannelHeader"));
var _OpenChannelInput = _interopRequireDefault(require("../component/OpenChannelInput"));
var _OpenChannelMessageList = _interopRequireDefault(require("../component/OpenChannelMessageList"));
var _OpenChannelStatusEmpty = _interopRequireDefault(require("../component/OpenChannelStatusEmpty"));
var _OpenChannelStatusLoading = _interopRequireDefault(require("../component/OpenChannelStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelModule = function () {
  let {
    Header = _OpenChannelHeader.default,
    MessageList = _OpenChannelMessageList.default,
    Input = _OpenChannelInput.default,
    StatusLoading = _OpenChannelStatusLoading.default,
    StatusEmpty = _OpenChannelStatusEmpty.default,
    Provider = _moduleContext.OpenChannelContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    MessageList,
    Input,
    Provider,
    StatusEmpty,
    StatusLoading,
    ...module
  };
};
var _default = createOpenChannelModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelModule.js.map