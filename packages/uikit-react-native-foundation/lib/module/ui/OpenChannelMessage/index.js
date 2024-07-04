import AdminMessage from './Message.admin';
import FileMessage from './Message.file';
import ImageFileMessage from './Message.file.image';
import VideoFileMessage from './Message.file.video';
import UnknownMessage from './Message.unknown';
import UserMessage from './Message.user';
import OpenGraphUserMessage from './Message.user.og';
const OpenChannelMessage = {
  User: UserMessage,
  OpenGraphUser: OpenGraphUserMessage,
  File: FileMessage,
  ImageFile: ImageFileMessage,
  VideoFile: VideoFileMessage,
  Admin: AdminMessage,
  Unknown: UnknownMessage
};
export default OpenChannelMessage;
//# sourceMappingURL=index.js.map