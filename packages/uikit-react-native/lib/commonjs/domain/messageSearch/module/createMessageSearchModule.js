"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _MessageSearchHeader = _interopRequireDefault(require("../component/MessageSearchHeader"));
var _MessageSearchList = _interopRequireDefault(require("../component/MessageSearchList"));
var _MessageSearchStatusEmpty = _interopRequireDefault(require("../component/MessageSearchStatusEmpty"));
var _MessageSearchStatusError = _interopRequireDefault(require("../component/MessageSearchStatusError"));
var _MessageSearchStatusLoading = _interopRequireDefault(require("../component/MessageSearchStatusLoading"));
var _moduleContext = require("./moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createMessageSearchModule = function () {
  let {
    Header = _MessageSearchHeader.default,
    List = _MessageSearchList.default,
    StatusError = _MessageSearchStatusError.default,
    StatusLoading = _MessageSearchStatusLoading.default,
    StatusEmpty = _MessageSearchStatusEmpty.default,
    Provider = _moduleContext.MessageSearchContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    Provider,
    StatusError,
    StatusEmpty,
    StatusLoading,
    ...module
  };
};
var _default = createMessageSearchModule;
exports.default = _default;
//# sourceMappingURL=createMessageSearchModule.js.map