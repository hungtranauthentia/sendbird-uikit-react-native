"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelModerationHeader = _interopRequireDefault(require("../component/GroupChannelModerationHeader"));
var _GroupChannelModerationMenu = _interopRequireDefault(require("../component/GroupChannelModerationMenu"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelModerationModule = function () {
  let {
    Header = _GroupChannelModerationHeader.default,
    Menu = _GroupChannelModerationMenu.default,
    Provider = _moduleContext.GroupChannelModerationContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    Menu,
    Provider,
    ...module
  };
};
var _default = createGroupChannelModerationModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelModerationModule.js.map