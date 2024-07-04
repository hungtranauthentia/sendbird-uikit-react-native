"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelListWithCollection = void 0;
var _react = require("react");
var _groupChannel = require("@sendbird/chat/groupChannel");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useAppFeatures = require("../../common/useAppFeatures");
var _useChannelHandler = require("../../handler/useChannelHandler");
var _reducer = require("./reducer");
const createGroupChannelListCollection = (sdk, collectionCreator) => {
  const passedCollection = collectionCreator === null || collectionCreator === void 0 ? void 0 : collectionCreator();
  if (passedCollection) return passedCollection;
  const filter = new _groupChannel.GroupChannelFilter();
  filter.includeEmpty = false;
  return sdk.groupChannel.createGroupChannelCollection({
    filter,
    limit: 20,
    order: _groupChannel.GroupChannelListOrder.LATEST_LAST_MESSAGE
  });
};
const useGroupChannelListWithCollection = (sdk, userId, options) => {
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useGroupChannelListWithCollection');
  const {
    deliveryReceiptEnabled
  } = (0, _useAppFeatures.useAppFeatures)(sdk);
  const collectionRef = (0, _react.useRef)();
  const {
    loading,
    groupChannels,
    refreshing,
    appendChannels,
    deleteChannels,
    updateRefreshing,
    updateLoading
  } = (0, _reducer.useGroupChannelListReducer)();
  const updateChannelsAndMarkAsDelivered = (markAsDelivered, source, updatedChannels) => {
    var _collectionRef$curren;
    const channels = ((_collectionRef$curren = collectionRef.current) === null || _collectionRef$curren === void 0 ? void 0 : _collectionRef$curren.channels) ?? [];
    appendChannels(channels, true);
    if (markAsDelivered && deliveryReceiptEnabled) {
      switch (source) {
        case _groupChannel.GroupChannelEventSource.EVENT_MESSAGE_RECEIVED:
        case _groupChannel.GroupChannelEventSource.EVENT_MESSAGE_SENT:
        case _groupChannel.GroupChannelEventSource.SYNC_CHANNEL_BACKGROUND:
        case _groupChannel.GroupChannelEventSource.SYNC_CHANNEL_CHANGELOGS:
        case undefined:
          (0, _uikitUtils.confirmAndMarkAsDelivered)(updatedChannels ?? channels);
          break;
      }
    }
  };
  const init = (0, _uikitUtils.useFreshCallback)(async uid => {
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
  (0, _react.useEffect)(() => {
    return () => {
      var _collectionRef$curren6;
      if (collectionRef.current) (_collectionRef$curren6 = collectionRef.current) === null || _collectionRef$curren6 === void 0 ? void 0 : _collectionRef$curren6.dispose();
    };
  }, []);
  (0, _uikitUtils.useAsyncEffect)(async () => {
    updateLoading(true);
    await init(userId);
    updateLoading(false);
  }, [userId]);
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
    onUserBanned: (channel, user) => {
      const isMe = user.userId === userId;
      if (isMe) deleteChannels([channel.url]);else updateChannelsAndMarkAsDelivered(false);
    }
  });
  const refresh = (0, _uikitUtils.useFreshCallback)(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const next = (0, _uikitUtils.useFreshCallback)(async () => {
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
exports.useGroupChannelListWithCollection = useGroupChannelListWithCollection;
//# sourceMappingURL=useGroupChannelListWithCollection.js.map