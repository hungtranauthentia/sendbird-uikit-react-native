"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelCreateHeader = _interopRequireDefault(require("../component/OpenChannelCreateHeader"));
var _OpenChannelCreateProfileInput = _interopRequireDefault(require("../component/OpenChannelCreateProfileInput"));
var _OpenChannelCreateStatusLoading = _interopRequireDefault(require("../component/OpenChannelCreateStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelCreateModule = function () {
  let {
    Header = _OpenChannelCreateHeader.default,
    ProfileInput = _OpenChannelCreateProfileInput.default,
    Provider = _moduleContext.OpenChannelCreateContextsProvider,
    StatusLoading = _OpenChannelCreateStatusLoading.default,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    ProfileInput,
    Provider,
    StatusLoading,
    ...module
  };
};
var _default = createOpenChannelCreateModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelCreateModule.js.map