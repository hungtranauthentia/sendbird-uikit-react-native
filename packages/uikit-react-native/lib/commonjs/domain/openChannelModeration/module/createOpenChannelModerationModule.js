"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelModerationHeader = _interopRequireDefault(require("../component/OpenChannelModerationHeader"));
var _OpenChannelModerationMenu = _interopRequireDefault(require("../component/OpenChannelModerationMenu"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelModerationModule = function () {
  let {
    Header = _OpenChannelModerationHeader.default,
    Menu = _OpenChannelModerationMenu.default,
    Provider = _moduleContext.OpenChannelModerationContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    Menu,
    Provider,
    ...module
  };
};
var _default = createOpenChannelModerationModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelModerationModule.js.map