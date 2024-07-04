"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelMessages = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
var _useGroupChannelMessagesWithCollection = require("./useGroupChannelMessagesWithCollection");
var _useGroupChannelMessagesWithQuery = require("./useGroupChannelMessagesWithQuery");
/**
 * @deprecated This hook is deprecated and will be replaced by the 'uikit-tools' package.
 * */
const useGroupChannelMessages = (sdk, channel, userId, options) => {
  if (sdk.isCacheEnabled || options !== null && options !== void 0 && options.enableCollectionWithoutLocalCache) {
    if (options !== null && options !== void 0 && options.queryCreator) printIgnoredWarning();
    return (0, _useGroupChannelMessagesWithCollection.useGroupChannelMessagesWithCollection)(sdk, channel, userId, options);
  } else {
    return (0, _useGroupChannelMessagesWithQuery.useGroupChannelMessagesWithQuery)(sdk, channel, userId, options);
  }
};
exports.useGroupChannelMessages = useGroupChannelMessages;
const printIgnoredWarning = () => {
  _uikitUtils.Logger.warn('If sdk.isCacheEnabled or enableCollectionWithoutLocalCache is turned on, queryCreator is ignored' + 'Please use collectionCreator instead.');
};
//# sourceMappingURL=index.js.map