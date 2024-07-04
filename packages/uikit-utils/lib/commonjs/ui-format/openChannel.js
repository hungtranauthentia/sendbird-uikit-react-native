"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpenChannelTitle = exports.getOpenChannelParticipants = void 0;
const getOpenChannelTitle = function (channel) {
  let DEFAULT_CHANNEL_NAME = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Open Channel';
  const trimmedChannelName = channel.name.trim();
  if (trimmedChannelName === '') return DEFAULT_CHANNEL_NAME;
  return trimmedChannelName;
};
exports.getOpenChannelTitle = getOpenChannelTitle;
const getOpenChannelParticipants = channel => {
  return `${channel.participantCount} participants`;
};
exports.getOpenChannelParticipants = getOpenChannelParticipants;
//# sourceMappingURL=openChannel.js.map