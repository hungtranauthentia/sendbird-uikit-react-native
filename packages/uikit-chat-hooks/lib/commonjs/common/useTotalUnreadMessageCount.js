"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTotalUnreadMessageCount = void 0;
var _react = require("react");
var _groupChannel = require("@sendbird/chat/groupChannel");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useUserEventHandler = require("../handler/useUserEventHandler");
const useTotalUnreadMessageCount = (sdk, options) => {
  var _options$params, _options$params2;
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useTotalUnreadMessageCount');
  const [unreadMessageCount, setUnreadMessageCount] = (0, _react.useState)(0);
  (0, _uikitUtils.useAsyncEffect)(async () => {
    const unreadCount = await sdk.groupChannel.getTotalUnreadMessageCount({
      superChannelFilter: _groupChannel.SuperChannelFilter.ALL,
      ...(options === null || options === void 0 ? void 0 : options.params)
    });
    setUnreadMessageCount(unreadCount);
  }, [sdk, options === null || options === void 0 ? void 0 : (_options$params = options.params) === null || _options$params === void 0 ? void 0 : _options$params.superChannelFilter, options === null || options === void 0 ? void 0 : (_options$params2 = options.params) === null || _options$params2 === void 0 ? void 0 : _options$params2.channelCustomTypesFilter]);
  (0, _useUserEventHandler.useUserEventHandler)(sdk, handlerId, {
    onTotalUnreadMessageCountUpdated: totalCount => setUnreadMessageCount(totalCount)
  });
  return (0, _uikitUtils.truncatedCount)(unreadMessageCount, options === null || options === void 0 ? void 0 : options.maxCount);
};
exports.useTotalUnreadMessageCount = useTotalUnreadMessageCount;
//# sourceMappingURL=useTotalUnreadMessageCount.js.map