import { useState } from 'react';
import { SuperChannelFilter } from '@sendbird/chat/groupChannel';
import { truncatedCount, useAsyncEffect, useUniqHandlerId } from '@sendbird/uikit-utils';
import { useUserEventHandler } from '../handler/useUserEventHandler';
export const useTotalUnreadMessageCount = (sdk, options) => {
  var _options$params, _options$params2;
  const handlerId = useUniqHandlerId('useTotalUnreadMessageCount');
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  useAsyncEffect(async () => {
    const unreadCount = await sdk.groupChannel.getTotalUnreadMessageCount({
      superChannelFilter: SuperChannelFilter.ALL,
      ...(options === null || options === void 0 ? void 0 : options.params)
    });
    setUnreadMessageCount(unreadCount);
  }, [sdk, options === null || options === void 0 ? void 0 : (_options$params = options.params) === null || _options$params === void 0 ? void 0 : _options$params.superChannelFilter, options === null || options === void 0 ? void 0 : (_options$params2 = options.params) === null || _options$params2 === void 0 ? void 0 : _options$params2.channelCustomTypesFilter]);
  useUserEventHandler(sdk, handlerId, {
    onTotalUnreadMessageCountUpdated: totalCount => setUnreadMessageCount(totalCount)
  });
  return truncatedCount(unreadMessageCount, options === null || options === void 0 ? void 0 : options.maxCount);
};
//# sourceMappingURL=useTotalUnreadMessageCount.js.map