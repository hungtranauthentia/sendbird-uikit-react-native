import { BufferedRequest } from '../shared/bufferedRequest';
/**
 * Diff utils for channel
 * @param {SendbirdBaseChannel} [a]
 * @param {SendbirdBaseChannel} [b]
 * @returns {boolean}
 * */
export function isDifferentChannel(a, b) {
  if (!a || !b) return true;
  return a.url !== b.url;
}
export const getGroupChannelChatAvailableState = channel => {
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
export const getOpenChannelChatAvailableState = async (channel, userId) => {
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
export const confirmAndMarkAsRead = async channels => {
  channels.filter(it => it.isGroupChannel() && it.unreadMessageCount > 0).forEach(it => BufferedRequest.markAsRead.push(() => it.markAsRead(), it.url));
};
export const confirmAndMarkAsDelivered = async channels => {
  channels.filter(it => it.isGroupChannel() && it.unreadMessageCount > 0).forEach(it => BufferedRequest.markAsDelivered.push(() => it.markAsDelivered(), it.url));
};
export function isDefaultCoverImage(coverUrl) {
  return coverUrl === '' || coverUrl.startsWith('https://static.sendbird.com/sample/cover');
}
export function getMembersExcludeMe(channel, currentUserId) {
  return channel.members.filter(m => m.userId !== currentUserId);
}
export function getGroupChannels(channels) {
  return channels.filter(c => c.isGroupChannel());
}
export function getOpenChannels(channels) {
  return channels.filter(c => c.isOpenChannel());
}
export function getChannelUniqId(channel) {
  return channel.url;
}
export function getDefaultGroupChannelCreateParams(params) {
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