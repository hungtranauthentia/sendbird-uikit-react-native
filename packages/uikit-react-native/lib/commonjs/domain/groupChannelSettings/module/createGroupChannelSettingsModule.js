"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelSettingsHeader = _interopRequireDefault(require("../component/GroupChannelSettingsHeader"));
var _GroupChannelSettingsInfo = _interopRequireDefault(require("../component/GroupChannelSettingsInfo"));
var _GroupChannelSettingsMenu = _interopRequireDefault(require("../component/GroupChannelSettingsMenu"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelSettingsModule = function () {
  let {
    Header = _GroupChannelSettingsHeader.default,
    Info = _GroupChannelSettingsInfo.default,
    Menu = _GroupChannelSettingsMenu.default,
    Provider = _moduleContext.GroupChannelSettingsContextsProvider,
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
var _default = createGroupChannelSettingsModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelSettingsModule.js.map