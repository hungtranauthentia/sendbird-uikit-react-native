import AdminMessage from './Message.admin';
import FileMessage from './Message.file';
import ImageFileMessage from './Message.file.image';
import VideoFileMessage from './Message.file.video';
import VoiceFileMessage from './Message.file.voice';
import UnknownMessage from './Message.unknown';
import UserMessage from './Message.user';
import OpenGraphUser from './Message.user.og';
const GroupChannelMessage = {
  User: UserMessage,
  OpenGraphUser: OpenGraphUser,
  File: FileMessage,
  ImageFile: ImageFileMessage,
  VideoFile: VideoFileMessage,
  VoiceFile: VoiceFileMessage,
  Admin: AdminMessage,
  Unknown: UnknownMessage
};
export default GroupChannelMessage;
//# sourceMappingURL=index.js.map