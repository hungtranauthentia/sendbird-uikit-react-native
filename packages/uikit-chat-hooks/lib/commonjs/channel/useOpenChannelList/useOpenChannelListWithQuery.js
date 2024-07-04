"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenChannelListWithQuery = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useChannelHandler = require("../../handler/useChannelHandler");
var _reducer = require("./reducer");
const createOpenChannelListQuery = (sdk, queryCreator) => {
  const passedQuery = queryCreator === null || queryCreator === void 0 ? void 0 : queryCreator();
  if (passedQuery) return passedQuery;
  return sdk.openChannel.createOpenChannelListQuery({});
};
const useOpenChannelListWithQuery = (sdk, userId, options) => {
  const queryRef = (0, _react.useRef)();
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useOpenChannelListWithQuery');
  const {
    error,
    loading,
    openChannels,
    refreshing,
    updateChannels,
    appendChannels,
    deleteChannels,
    updateRefreshing,
    updateLoading,
    updateError
  } = (0, _reducer.useOpenChannelListReducer)();
  const init = (0, _uikitUtils.useFreshCallback)(async uid => {
    if (uid) {
      var _queryRef$current;
      queryRef.current = createOpenChannelListQuery(sdk, options === null || options === void 0 ? void 0 : options.queryCreator);
      if ((_queryRef$current = queryRef.current) !== null && _queryRef$current !== void 0 && _queryRef$current.hasNext) {
        const channels = await queryRef.current.next();
        appendChannels(channels, true);
      }
    }
  });
  const updateChannel = channel => {
    if (channel.isOpenChannel()) updateChannels([channel]);
  };
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
    onChannelChanged: updateChannel,
    onChannelFrozen: updateChannel,
    onChannelUnfrozen: updateChannel,
    onChannelDeleted: url => deleteChannels([url]),
    onUserEntered: (channel, user) => {
      const isMe = user.userId === userId;
      if (isMe && channel.isOpenChannel() && !openChannels.find(it => it.url === channel.url)) {
        appendChannels([], true);
        refresh();
      }
    }
  }, 'open');
  (0, _uikitUtils.useAsyncEffect)(async () => {
    updateLoading(true);
    updateError(null);
    try {
      await init(userId);
    } catch (e) {
      updateError(e);
      appendChannels([], true);
    } finally {
      updateLoading(false);
    }
  }, [userId]);
  const refresh = (0, _uikitUtils.useFreshCallback)(async () => {
    updateRefreshing(true);
    updateError(null);
    try {
      await init(userId);
    } catch (e) {
      updateError(e);
      appendChannels([], true);
    } finally {
      updateRefreshing(false);
    }
  });
  const next = (0, _uikitUtils.useFreshCallback)(async () => {
    var _queryRef$current2;
    if ((_queryRef$current2 = queryRef.current) !== null && _queryRef$current2 !== void 0 && _queryRef$current2.hasNext) {
      const channels = await queryRef.current.next();
      appendChannels(channels, false);
    }
  });
  return {
    error,
    loading,
    openChannels,
    refresh,
    refreshing,
    next
  };
};
exports.useOpenChannelListWithQuery = useOpenChannelListWithQuery;
//# sourceMappingURL=useOpenChannelListWithQuery.js.map