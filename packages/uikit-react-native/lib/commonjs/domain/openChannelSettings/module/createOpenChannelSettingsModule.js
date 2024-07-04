"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelSettingsHeader = _interopRequireDefault(require("../component/OpenChannelSettingsHeader"));
var _OpenChannelSettingsInfo = _interopRequireDefault(require("../component/OpenChannelSettingsInfo"));
var _OpenChannelSettingsMenu = _interopRequireDefault(require("../component/OpenChannelSettingsMenu"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelSettingsModule = function () {
  let {
    Header = _OpenChannelSettingsHeader.default,
    Info = _OpenChannelSettingsInfo.default,
    Menu = _OpenChannelSettingsMenu.default,
    Provider = _moduleContext.OpenChannelSettingsContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    Info,
    Menu,
    Provider,
    ...module
  };
};
var _default = createOpenChannelSettingsModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelSettingsModule.js.map