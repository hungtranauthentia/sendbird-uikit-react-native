"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelList = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
var _useGroupChannelListWithCollection = require("./useGroupChannelListWithCollection");
var _useGroupChannelListWithQuery = require("./useGroupChannelListWithQuery");
/**
 * @deprecated This hook is deprecated and will be replaced by the 'uikit-tools' package.
 * */
const useGroupChannelList = (sdk, userId, options) => {
  if (sdk.isCacheEnabled || options !== null && options !== void 0 && options.enableCollectionWithoutLocalCache) {
    if (options !== null && options !== void 0 && options.queryCreator) _uikitUtils.Logger.warn('`queryCreator` is ignored, please use `collectionCreator` instead.');
    return (0, _useGroupChannelListWithCollection.useGroupChannelListWithCollection)(sdk, userId, options);
  } else {
    return (0, _useGroupChannelListWithQuery.useGroupChannelListWithQuery)(sdk, userId, options);
  }
};
exports.useGroupChannelList = useGroupChannelList;
//# sourceMappingURL=index.js.map