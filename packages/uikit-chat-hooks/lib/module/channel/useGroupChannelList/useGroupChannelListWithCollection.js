import { useEffect, useRef } from 'react';
import { GroupChannelEventSource, GroupChannelFilter, GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import { confirmAndMarkAsDelivered, useAsyncEffect, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import { useAppFeatures } from '../../common/useAppFeatures';
import { useChannelHandler } from '../../handler/useChannelHandler';
import { useGroupChannelListReducer } from './reducer';
const createGroupChannelListCollection = (sdk, collectionCreator) => {
  const passedCollection = collectionCreator === null || collectionCreator === void 0 ? void 0 : collectionCreator();
  if (passedCollection) return passedCollection;
  const filter = new GroupChannelFilter();
  filter.includeEmpty = false;
  return sdk.groupChannel.createGroupChannelCollection({
    filter,
    limit: 20,
    order: GroupChannelListOrder.LATEST_LAST_MESSAGE
  });
};
export const useGroupChannelListWithCollection = (sdk, userId, options) => {
  const handlerId = useUniqHandlerId('useGroupChannelListWithCollection');
  const {
    deliveryReceiptEnabled
  } = useAppFeatures(sdk);
  const collectionRef = useRef();
  const {
    loading,
    groupChannels,
    refreshing,
    appendChannels,
    deleteChannels,
    updateRefreshing,
    updateLoading
  } = useGroupChannelListReducer();
  const updateChannelsAndMarkAsDelivered = (markAsDelivered, source, updatedChannels) => {
    var _collectionRef$curren;
    const channels = ((_collectionRef$curren = collectionRef.current) === null || _collectionRef$curren === void 0 ? void 0 : _collectionRef$curren.channels) ?? [];
    appendChannels(channels, true);
    if (markAsDelivered && deliveryReceiptEnabled) {
      switch (source) {
        case GroupChannelEventSource.EVENT_MESSAGE_RECEIVED:
        case GroupChannelEventSource.EVENT_MESSAGE_SENT:
        case GroupChannelEventSource.SYNC_CHANNEL_BACKGROUND:
        case GroupChannelEventSource.SYNC_CHANNEL_CHANGELOGS:
        case undefined:
          confirmAndMarkAsDelivered(updatedChannels ?? channels);
          break;
      }
    }
  };
  const init = useFreshCallback(async uid => {
    var _collectionRef$curren2;
    if (collectionRef.current) (_collectionRef$curren2 = collectionRef.current) === null || _collectionRef$curren2 === void 0 ? void 0 : _collectionRef$curren2.dispose();
    if (uid) {
      var _collectionRef$curren3, _collectionRef$curren4;
      collectionRef.current = createGroupChannelListCollection(sdk, options === null || options === void 0 ? void 0 : options.collectionCreator);
      (_collectionRef$curren3 = collectionRef.current) === null || _collectionRef$curren3 === void 0 ? void 0 : _collectionRef$curren3.setGroupChannelCollectionHandler({
        onChannelsAdded: (context, channels) => {
          updateChannelsAndMarkAsDelivered(true, context.source, channels);
        },
        onChannelsUpdated: (context, channels) => {
          updateChannelsAndMarkAsDelivered(true, context.source, channels);
        },
        onChannelsDeleted: () => {
          updateChannelsAndMarkAsDelivered(false);
        }
      });
      if ((_collectionRef$curren4 = collectionRef.current) !== null && _collectionRef$curren4 !== void 0 && _collectionRef$curren4.hasMore) {
        var _collectionRef$curren5;
        await ((_collectionRef$curren5 = collectionRef.current) === null || _collectionRef$curren5 === void 0 ? void 0 : _collectionRef$curren5.loadMore());
        updateChannelsAndMarkAsDelivered(true);
      }
    }
  });
  useEffect(() => {
    return () => {
      var _collectionRef$curren6;
      if (collectionRef.current) (_collectionRef$curren6 = collectionRef.current) === null || _collectionRef$curren6 === void 0 ? void 0 : _collectionRef$curren6.dispose();
    };
  }, []);
  useAsyncEffect(async () => {
    updateLoading(true);
    await init(userId);
    updateLoading(false);
  }, [userId]);
  useChannelHandler(sdk, handlerId, {
    onUserBanned: (channel, user) => {
      const isMe = user.userId === userId;
      if (isMe) deleteChannels([channel.url]);else updateChannelsAndMarkAsDelivered(false);
    }
  });
  const refresh = useFreshCallback(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const next = useFreshCallback(async () => {
    var _collectionRef$curren7;
    if ((_collectionRef$curren7 = collectionRef.current) !== null && _collectionRef$curren7 !== void 0 && _collectionRef$curren7.hasMore) {
      var _collectionRef$curren8;
      await ((_collectionRef$curren8 = collectionRef.current) === null || _collectionRef$curren8 === void 0 ? void 0 : _collectionRef$curren8.loadMore());
      updateChannelsAndMarkAsDelivered(true);
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
//# sourceMappingURL=useGroupChannelListWithCollection.js.map