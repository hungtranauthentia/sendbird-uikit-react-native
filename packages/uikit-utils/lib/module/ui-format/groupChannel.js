import { getMessagePreviewBody, getMessagePreviewTime } from './common';
export const getGroupChannelTitle = function (currentUserId, channel) {
  let EMPTY_USERNAME = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '(No name)';
  let NO_MEMBERS = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '(No members)';
  let DEFAULT_CHANNEL_NAME = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Group Channel';
  if (channel.name !== DEFAULT_CHANNEL_NAME && channel.name !== '') return channel.name;
  if (channel.memberCount === 1) return NO_MEMBERS;
  return channel.members.filter(_ref => {
    let {
      userId
    } = _ref;
    return userId !== currentUserId;
  }).map(_ref2 => {
    let {
      nickname
    } = _ref2;
    return nickname || EMPTY_USERNAME;
  }).join(', ');
};
export const getGroupChannelPreviewTime = (channel, locale) => {
  var _channel$lastMessage;
  return getMessagePreviewTime(((_channel$lastMessage = channel.lastMessage) === null || _channel$lastMessage === void 0 ? void 0 : _channel$lastMessage.createdAt) || channel.joinedAt * 1000 || channel.createdAt, locale);
};
export const getGroupChannelLastMessage = function (channel) {
  let EMPTY_MESSAGE = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  const message = channel.lastMessage;
  if (!message) return EMPTY_MESSAGE;
  return getMessagePreviewBody(message, EMPTY_MESSAGE);
};
//# sourceMappingURL=groupChannel.js.map