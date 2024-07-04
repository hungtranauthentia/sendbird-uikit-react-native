"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmAndMarkAsRead = exports.confirmAndMarkAsDelivered = void 0;
exports.getChannelUniqId = getChannelUniqId;
exports.getDefaultGroupChannelCreateParams = getDefaultGroupChannelCreateParams;
exports.getGroupChannelChatAvailableState = void 0;
exports.getGroupChannels = getGroupChannels;
exports.getMembersExcludeMe = getMembersExcludeMe;
exports.getOpenChannelChatAvailableState = void 0;
exports.getOpenChannels = getOpenChannels;
exports.isDefaultCoverImage = isDefaultCoverImage;
exports.isDifferentChannel = isDifferentChannel;
var _bufferedRequest = require("../shared/bufferedRequest");
/**
 * Diff utils for channel
 * @param {SendbirdBaseChannel} [a]
 * @param {SendbirdBaseChannel} [b]
 * @returns {boolean}
 * */
function isDifferentChannel(a, b) {
  if (!a || !b) return true;
  return a.url !== b.url;
}
const getGroupChannelChatAvailableState = channel => {
  const isOperator = channel.myRole === 'operator';
  const frozen = channel.isFrozen && !isOperator;
  const muted = channel.myMutedState === 'muted';
  const disabled = frozen || muted;
  return {
    disabled,
    frozen,
    muted
  };
};
exports.getGroupChannelChatAvailableState = getGroupChannelChatAvailableState;
const getOpenChannelChatAvailableState = async (channel, userId) => {
  const isOperator = channel.isOperator(userId);
  const frozen = channel.isFrozen && !isOperator;
  const muted = (await channel.getMyMutedInfo()).isMuted;
  const disabled = frozen || muted;
  return {
    disabled,
    frozen,
    muted
  };
};
exports.getOpenChannelChatAvailableState = getOpenChannelChatAvailableState;
const confirmAndMarkAsRead = async channels => {
  channels.filter(it => it.isGroupChannel() && it.unreadMessageCount > 0).forEach(it => _bufferedRequest.BufferedRequest.markAsRead.push(() => it.markAsRead(), it.url));
};
exports.confirmAndMarkAsRead = confirmAndMarkAsRead;
const confirmAndMarkAsDelivered = async channels => {
  channels.filter(it => it.isGroupChannel() && it.unreadMessageCount > 0).forEach(it => _bufferedRequest.BufferedRequest.markAsDelivered.push(() => it.markAsDelivered(), it.url));
};
exports.confirmAndMarkAsDelivered = confirmAndMarkAsDelivered;
function isDefaultCoverImage(coverUrl) {
  return coverUrl === '' || coverUrl.startsWith('https://static.sendbird.com/sample/cover');
}
function getMembersExcludeMe(channel, currentUserId) {
  return channel.members.filter(m => m.userId !== currentUserId);
}
function getGroupChannels(channels) {
  return channels.filter(c => c.isGroupChannel());
}
function getOpenChannels(channels) {
  return channels.filter(c => c.isOpenChannel());
}
function getChannelUniqId(channel) {
  return channel.url;
}
function getDefaultGroupChannelCreateParams(params) {
  const createParams = {
    name: '',
    coverUrl: '',
    isDistinct: false,
    invitedUserIds: params.invitedUserIds
  };
  if (params.currentUserId) createParams.operatorUserIds = [params.currentUserId];
  return createParams;
}
//# sourceMappingURL=channel.js.map