import { Logger } from '@sendbird/uikit-utils';
import { useGroupChannelMessagesWithCollection } from './useGroupChannelMessagesWithCollection';
import { useGroupChannelMessagesWithQuery } from './useGroupChannelMessagesWithQuery';

/**
 * @deprecated This hook is deprecated and will be replaced by the 'uikit-tools' package.
 * */
export const useGroupChannelMessages = (sdk, channel, userId, options) => {
  if (sdk.isCacheEnabled || options !== null && options !== void 0 && options.enableCollectionWithoutLocalCache) {
    if (options !== null && options !== void 0 && options.queryCreator) printIgnoredWarning();
    return useGroupChannelMessagesWithCollection(sdk, channel, userId, options);
  } else {
    return useGroupChannelMessagesWithQuery(sdk, channel, userId, options);
  }
};
const printIgnoredWarning = () => {
  Logger.warn('If sdk.isCacheEnabled or enableCollectionWithoutLocalCache is turned on, queryCreator is ignored' + 'Please use collectionCreator instead.');
};
//# sourceMappingURL=index.js.map