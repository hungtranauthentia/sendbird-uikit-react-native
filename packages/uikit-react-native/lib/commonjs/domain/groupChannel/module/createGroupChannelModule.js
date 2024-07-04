"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GroupChannelHeader = _interopRequireDefault(require("../component/GroupChannelHeader"));
var _GroupChannelInput = _interopRequireDefault(require("../component/GroupChannelInput"));
var _GroupChannelMessageList = _interopRequireDefault(require("../component/GroupChannelMessageList"));
var _GroupChannelStatusEmpty = _interopRequireDefault(require("../component/GroupChannelStatusEmpty"));
var _GroupChannelStatusLoading = _interopRequireDefault(require("../component/GroupChannelStatusLoading"));
var _GroupChannelSuggestedMentionList = _interopRequireDefault(require("../component/GroupChannelSuggestedMentionList"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelModule = function () {
  let {
    Header = _GroupChannelHeader.default,
    MessageList = _GroupChannelMessageList.default,
    Input = _GroupChannelInput.default,
    SuggestedMentionList = _GroupChannelSuggestedMentionList.default,
    StatusLoading = _GroupChannelStatusLoading.default,
    StatusEmpty = _GroupChannelStatusEmpty.default,
    Provider = _moduleContext.GroupChannelContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    MessageList,
    Input,
    SuggestedMentionList,
    StatusEmpty,
    StatusLoading,
    Provider,
    ...module
  };
};
var _default = createGroupChannelModule;
exports.default = _default;
//# sourceMappingURL=createGroupChannelModule.js.map