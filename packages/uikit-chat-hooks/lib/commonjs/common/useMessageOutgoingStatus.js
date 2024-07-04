"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMessageOutgoingStatus = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
var _useChannelHandler = require("../handler/useChannelHandler");
var _useAppFeatures = require("./useAppFeatures");
const useMessageOutgoingStatus = (sdk, channel, message) => {
  const features = (0, _useAppFeatures.useAppFeatures)(sdk);
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const currentUser = sdk.currentUser;
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useMessageOutgoingStatus');
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
    onUndeliveredMemberStatusUpdated(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (!(0, _uikitUtils.isMyMessage)(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId)) return;
      forceUpdate();
    },
    onUnreadMemberStatusUpdated(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (!(0, _uikitUtils.isMyMessage)(message, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId)) return;
      forceUpdate();
    }
  });
  if (!message) return 'NONE';
  if ('sendingStatus' in message) {
    if (message.sendingStatus === 'pending') return 'PENDING';
    if (message.sendingStatus === 'failed') return 'FAILED';
  }
  if (channel.isBroadcast || channel.isSuper) return 'NONE';
  if (channel.getUnreadMemberCount(message) === 0) return 'READ';
  if (features.deliveryReceiptEnabled) {
    if (channel.getUndeliveredMemberCount(message) === 0) return 'DELIVERED';
    return 'UNDELIVERED';
  }
  return 'UNREAD';
};
exports.useMessageOutgoingStatus = useMessageOutgoingStatus;
//# sourceMappingURL=useMessageOutgoingStatus.js.map