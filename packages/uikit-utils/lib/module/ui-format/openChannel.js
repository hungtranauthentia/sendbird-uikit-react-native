export const getOpenChannelTitle = function (channel) {
  let DEFAULT_CHANNEL_NAME = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Open Channel';
  const trimmedChannelName = channel.name.trim();
  if (trimmedChannelName === '') return DEFAULT_CHANNEL_NAME;
  return trimmedChannelName;
};
export const getOpenChannelParticipants = channel => {
  return `${channel.participantCount} participants`;
};
//# sourceMappingURL=openChannel.js.map