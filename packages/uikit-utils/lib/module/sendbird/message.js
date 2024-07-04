import { MessageSearchOrder } from '@sendbird/chat/message';
import { getFileExtension, getFileType, parseMimeType } from '../shared/file';
import { getMessageTimeFormat } from '../ui-format/common';
export function isNewMessage(msg, currentUserId) {
  const myMessage = isMyMessage(msg, currentUserId);
  if (myMessage) return false;
  if (msg.isAdminMessage()) return false;
  return msg.updatedAt === 0;
}
export function isSendableMessage(msg) {
  return msg !== undefined && msg !== null && 'sendingStatus' in msg;
}
export function isMyMessage(msg) {
  var _msg$sender;
  let currentUserId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '##__USER_ID_IS_NOT_PROVIDED__##';
  if (!isSendableMessage(msg)) return false;
  return ((_msg$sender = msg.sender) === null || _msg$sender === void 0 ? void 0 : _msg$sender.userId) === currentUserId;
}
export function messageKeyExtractor(message) {
  return getMessageUniqId(message);
}

// |-------------------|-------------------|-----------------|-------------------|
// |   sending status  |       reqId       |    messageId    |     createdAt     |
// |-------------------|-------------------|-----------------|-------------------|
// |     pending       |    timestamp(A)   |        0        |    timestamp(B)   |
// |     canceled      |    timestamp(A)   |        0        |         ?         |
// |     failed        |    timestamp(A)   |        0        |         ?         |
// |     succeeded     | timestamp(A) / '' |    id from DB   |    timestamp(C)   |
// |-------------------|-------------------|-----------------|-------------------|
export function messageComparator(a, b) {
  let aStatusOffset = 0;
  let bStatusOffset = 0;
  if (isSendableMessage(a) && a.sendingStatus !== 'succeeded') aStatusOffset = Number.MAX_SAFE_INTEGER;
  if (isSendableMessage(b) && b.sendingStatus !== 'succeeded') bStatusOffset = Number.MAX_SAFE_INTEGER;
  return b.createdAt + bStatusOffset - (a.createdAt + aStatusOffset);
}
export function hasSameSender(a, b) {
  var _a$sender, _b$sender;
  if (!a || !b) return false;
  if ('sender' in a && 'sender' in b) return ((_a$sender = a.sender) === null || _a$sender === void 0 ? void 0 : _a$sender.userId) === ((_b$sender = b.sender) === null || _b$sender === void 0 ? void 0 : _b$sender.userId);
  return false;
}
export function calcMessageGrouping(groupEnabled, curr, prev, next) {
  const getPrev = () => {
    if (!groupEnabled) return false;
    if (!prev) return false;
    if (curr.isAdminMessage()) return false;
    if (!hasSameSender(curr, prev)) return false;
    if (getMessageTimeFormat(new Date(curr.createdAt)) !== getMessageTimeFormat(new Date(prev.createdAt))) return false;
    return true;
  };
  const getNext = () => {
    if (!groupEnabled) return false;
    if (!next) return false;
    if (curr.isAdminMessage()) return false;
    if (!hasSameSender(curr, next)) return false;
    if (getMessageTimeFormat(new Date(curr.createdAt)) !== getMessageTimeFormat(new Date(next.createdAt))) return false;
    return true;
  };
  return {
    groupWithPrev: getPrev(),
    groupWithNext: getNext()
  };
}
export function getMessageUniqId(msg) {
  if (msg.isUserMessage() || msg.isFileMessage()) {
    if (msg.sendingStatus === 'succeeded') return String(msg.messageId);
    return msg.reqId;
  }
  return String(msg.messageId);
}
export function getThumbnailUriFromFileMessage(message) {
  if (message.thumbnails && message.thumbnails.length > 0) {
    return message.thumbnails[0].url;
  }
  return getAvailableUriFromFileMessage(message);
}
export function getAvailableUriFromFileMessage(message) {
  var _message$messageParam;
  if (!message.url && (_message$messageParam = message.messageParams) !== null && _message$messageParam !== void 0 && _message$messageParam.file && 'uri' in message.messageParams.file) {
    return message.messageParams.file.uri;
  }
  return message.url;
}
export function isSendbirdNotification(dataPayload) {
  if (!dataPayload) return false;
  return Boolean(dataPayload['sendbird']);
}
export function parseSendbirdNotification(dataPayload) {
  return typeof dataPayload.sendbird === 'string' ? JSON.parse(dataPayload.sendbird) : dataPayload.sendbird;
}
export function shouldRenderParentMessage(message) {
  var _message$parentMessag, _message$parentMessag2;
  return !!((message.isFileMessage() || message.isUserMessage()) && ((_message$parentMessag = message.parentMessage) !== null && _message$parentMessag !== void 0 && _message$parentMessag.isFileMessage() || (_message$parentMessag2 = message.parentMessage) !== null && _message$parentMessag2 !== void 0 && _message$parentMessag2.isUserMessage()));
}
export function shouldRenderReaction(channel, reactionEnabled) {
  if (channel.isOpenChannel()) {
    return false;
  }
  if (channel.isGroupChannel()) {
    if (channel.isBroadcast) return false;
    if (channel.isEphemeral) return false;
    if (channel.isChatNotification) return false;
  }
  return reactionEnabled;
}
export function getReactionCount(reaction) {
  return reaction.userIds.length;
}
const fileIconMapper = {
  'audio': 'file-audio',
  'image': 'photo',
  'video': 'play',
  'file': 'file-document'
};
export function getFileTypeFromMessage(message) {
  return getFileType(message.type || getFileExtension(message.name));
}
export const convertFileTypeToMessageType = function () {
  let fileType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'file';
  switch (fileType) {
    case 'audio':
    case 'image':
    case 'video':
      return `file.${fileType}`;
    case 'file':
      return fileType;
  }
};
export const getFileIconFromMessageType = messageType => {
  switch (messageType) {
    case 'file':
      return fileIconMapper['file'];
    case 'file.image':
      return fileIconMapper['image'];
    case 'file.video':
      return fileIconMapper['video'];
    case 'file.audio':
      return fileIconMapper['audio'];
    default:
      return fileIconMapper['file'];
  }
};
export const getFileIconFromMessage = message => {
  const fileType = getFileTypeFromMessage(message);
  const messageType = convertFileTypeToMessageType(fileType);
  return getFileIconFromMessageType(messageType);
};
export function getMessageType(message) {
  if (message.isAdminMessage()) {
    return 'admin';
  }
  if (message.isUserMessage()) {
    if (message.ogMetaData) {
      return 'user.opengraph';
    }
    return 'user';
  }
  if (message.isFileMessage()) {
    if (isVoiceMessage(message)) {
      return 'file.voice';
    }
    const fileType = getFileTypeFromMessage(message);
    switch (fileType) {
      case 'image':
      case 'video':
        {
          return `file.${fileType}`;
        }
      case 'audio':
        {
          return `file.${fileType}`;
        }
      default:
        {
          return 'file';
        }
    }
  }
  return 'unknown';
}
export function getDefaultMessageSearchQueryParams(channel, keyword) {
  return {
    keyword,
    channelUrl: channel.url,
    messageTimestampFrom: Math.max(channel.joinedAt, channel.invitedAt),
    order: MessageSearchOrder.TIMESTAMP
  };
}
const SBU_MIME_PARAM_KEY = 'sbu_type';
const SBU_MIME_PARAM_VOICE_MESSAGE_VALUE = 'voice';
export function isVoiceMessage(message) {
  if (!message.isFileMessage()) return false;
  const {
    parameters
  } = parseMimeType(message.type);
  return !!parameters[SBU_MIME_PARAM_KEY] && parameters[SBU_MIME_PARAM_KEY] === SBU_MIME_PARAM_VOICE_MESSAGE_VALUE;
}
export function getVoiceMessageFileObject(uri) {
  let extension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'm4a';
  return {
    uri,
    type: getVoiceMessageMimeType(extension),
    name: `Voice_message.${extension}`,
    size: 0
  };
}
export function getVoiceMessageMimeType() {
  let extension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'm4a';
  return `audio/${extension};${SBU_MIME_PARAM_KEY}=${SBU_MIME_PARAM_VOICE_MESSAGE_VALUE}`;
}
//# sourceMappingURL=message.js.map