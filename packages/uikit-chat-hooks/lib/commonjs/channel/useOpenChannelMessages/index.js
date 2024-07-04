"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenChannelMessages = void 0;
var _useOpenChannelMessagesWithQuery = require("./useOpenChannelMessagesWithQuery");
const useOpenChannelMessages = (sdk, channel, userId, options) => {
  return (0, _useOpenChannelMessagesWithQuery.useOpenChannelMessagesWithQuery)(sdk, channel, userId, options);
};
exports.useOpenChannelMessages = useOpenChannelMessages;
//# sourceMappingURL=index.js.map