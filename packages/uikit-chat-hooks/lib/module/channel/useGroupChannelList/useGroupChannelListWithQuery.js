import { useRef } from 'react';
import { GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import { confirmAndMarkAsDelivered, useAsyncEffect, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import { useAppFeatures } from '../../common/useAppFeatures';
import { useChannelHandler } from '../../handler/useChannelHandler';
import { useGroupChannelListReducer } from './reducer';
const createGroupChannelListQuery = (sdk, queryCreator) => {
  const passedQuery = queryCreator === null || queryCreator === void 0 ? void 0 : queryCreator();
  if (passedQuery) return passedQuery;
  return sdk.groupChannel.createMyGroupChannelListQuery({
    includeEmpty: false,
    limit: 20,
    order: GroupChannelListOrder.LATEST_LAST_MESSAGE
  });
};
export const useGroupChannelListWithQuery = (sdk, userId, options) => {
  const {
    deliveryReceiptEnabled
  } = useAppFeatures(sdk);
  const queryRef = useRef();
  const handlerId = useUniqHandlerId('useGroupChannelListWithQuery');
  const {
    loading,
    groupChannels,
    refreshing,
    updateChannels,
    appendChannels,
    deleteChannels,
    updateRefreshing,
    updateLoading,
    updateOrder
  } = useGroupChannelListReducer();
  const updateChannelsAndMarkAsDelivered = channels => {
    updateChannels(channels);
    if (deliveryReceiptEnabled) confirmAndMarkAsDelivered(channels);
  };
  const init = useFreshCallback(async uid => {
    if (uid) {
      var _queryRef$current, _queryRef$current2;
      queryRef.current = createGroupChannelListQuery(sdk, options === null || options === void 0 ? void 0 : options.queryCreator);
      updateOrder((_queryRef$current = queryRef.current) === null || _queryRef$current === void 0 ? void 0 : _queryRef$current.order);
      if ((_queryRef$current2 = queryRef.current) !== null && _queryRef$current2 !== void 0 && _queryRef$current2.hasNext) {
        const channels = await queryRef.current.next();
        appendChannels(channels, true);
        if (deliveryReceiptEnabled) confirmAndMarkAsDelivered(channels);
      }
    }
  });
  useAsyncEffect(async () => {
    updateLoading(true);
    await init(userId);
    updateLoading(false);
  }, [userId]);
  useChannelHandler(sdk, handlerId, {
    onChannelChanged: channel => updateChannels([channel]),
    onChannelFrozen: channel => updateChannels([channel]),
    onChannelUnfrozen: channel => updateChannels([channel]),
    onChannelMemberCountChanged: channels => updateChannels(channels),
    onChannelDeleted: url => deleteChannels([url]),
    onUserJoined: channel => updateChannels([channel]),
    onUserLeft: (channel, user) => {
      const isMe = user.userId === userId;
      if (isMe) deleteChannels([channel.url]);else updateChannels([channel]);
    },
    onUserBanned(channel, user) {
      const isMe = user.userId === userId;
      if (isMe) deleteChannels([channel.url]);else updateChannels([channel]);
    },
    onMessageReceived(channel) {
      updateChannelsAndMarkAsDelivered([channel]);
    }
  });
  const refresh = useFreshCallback(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const next = useFreshCallback(async () => {
    var _queryRef$current3;
    if ((_queryRef$current3 = queryRef.current) !== null && _queryRef$current3 !== void 0 && _queryRef$current3.hasNext) {
      const channels = await queryRef.current.next();
      appendChannels(channels, false);
      if (deliveryReceiptEnabled) confirmAndMarkAsDelivered(channels);
    }
  });
  return {
    loading,
    groupChannels,
    refresh,
    refreshing,
    next
  };
};
//# sourceMappingURL=useGroupChannelListWithQuery.js.map