"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OpenChannelMutedParticipantsHeader = _interopRequireDefault(require("../component/OpenChannelMutedParticipantsHeader"));
var _OpenChannelMutedParticipantsList = _interopRequireDefault(require("../component/OpenChannelMutedParticipantsList"));
var _OpenChannelMutedParticipantsStatusEmpty = _interopRequireDefault(require("../component/OpenChannelMutedParticipantsStatusEmpty"));
var _OpenChannelMutedParticipantsStatusError = _interopRequireDefault(require("../component/OpenChannelMutedParticipantsStatusError"));
var _OpenChannelMutedParticipantsStatusLoading = _interopRequireDefault(require("../component/OpenChannelMutedParticipantsStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelMutedParticipantsModule = function () {
  let {
    Header = _OpenChannelMutedParticipantsHeader.default,
    List = _OpenChannelMutedParticipantsList.default,
    StatusLoading = _OpenChannelMutedParticipantsStatusLoading.default,
    StatusEmpty = _OpenChannelMutedParticipantsStatusEmpty.default,
    StatusError = _OpenChannelMutedParticipantsStatusError.default,
    Provider = _moduleContext.OpenChannelMutedParticipantsContextsProvider,
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
var _default = createOpenChannelMutedParticipantsModule;
exports.default = _default;
//# sourceMappingURL=createOpenChannelMutedParticipantsModule.js.map