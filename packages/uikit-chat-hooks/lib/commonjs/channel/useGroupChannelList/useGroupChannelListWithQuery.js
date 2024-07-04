"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelListWithQuery = void 0;
var _react = require("react");
var _groupChannel = require("@sendbird/chat/groupChannel");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useAppFeatures = require("../../common/useAppFeatures");
var _useChannelHandler = require("../../handler/useChannelHandler");
var _reducer = require("./reducer");
const createGroupChannelListQuery = (sdk, queryCreator) => {
  const passedQuery = queryCreator === null || queryCreator === void 0 ? void 0 : queryCreator();
  if (passedQuery) return passedQuery;
  return sdk.groupChannel.createMyGroupChannelListQuery({
    includeEmpty: false,
    limit: 20,
    order: _groupChannel.GroupChannelListOrder.LATEST_LAST_MESSAGE
  });
};
const useGroupChannelListWithQuery = (sdk, userId, options) => {
  const {
    deliveryReceiptEnabled
  } = (0, _useAppFeatures.useAppFeatures)(sdk);
  const queryRef = (0, _react.useRef)();
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useGroupChannelListWithQuery');
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
  } = (0, _reducer.useGroupChannelListReducer)();
  const updateChannelsAndMarkAsDelivered = channels => {
    updateChannels(channels);
    if (deliveryReceiptEnabled) (0, _uikitUtils.confirmAndMarkAsDelivered)(channels);
  };
  const init = (0, _uikitUtils.useFreshCallback)(async uid => {
    if (uid) {
      var _queryRef$current, _queryRef$current2;
      queryRef.current = createGroupChannelListQuery(sdk, options === null || options === void 0 ? void 0 : options.queryCreator);
      updateOrder((_queryRef$current = queryRef.current) === null || _queryRef$current === void 0 ? void 0 : _queryRef$current.order);
      if ((_queryRef$current2 = queryRef.current) !== null && _queryRef$current2 !== void 0 && _queryRef$current2.hasNext) {
        const channels = await queryRef.current.next();
        appendChannels(channels, true);
        if (deliveryReceiptEnabled) (0, _uikitUtils.confirmAndMarkAsDelivered)(channels);
      }
    }
  });
  (0, _uikitUtils.useAsyncEffect)(async () => {
    updateLoading(true);
    await init(userId);
    updateLoading(false);
  }, [userId]);
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
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
  const refresh = (0, _uikitUtils.useFreshCallback)(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const next = (0, _uikitUtils.useFreshCallback)(async () => {
    var _queryRef$current3;
    if ((_queryRef$current3 = queryRef.current) !== null && _queryRef$current3 !== void 0 && _queryRef$current3.hasNext) {
      const channels = await queryRef.current.next();
      appendChannels(channels, false);
      if (deliveryReceiptEnabled) (0, _uikitUtils.confirmAndMarkAsDelivered)(channels);
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
exports.useGroupChannelListWithQuery = useGroupChannelListWithQuery;
//# sourceMappingURL=useGroupChannelListWithQuery.js.map