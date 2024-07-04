import { MessageSearchOrder } from '@sendbird/chat/message';
import type { SendbirdBaseChannel, SendbirdBaseMessage, SendbirdDataPayload, SendbirdFileMessage, SendbirdGroupChannel, SendbirdMessage, SendbirdReaction, SendbirdSendableMessage, SendbirdUserMessage } from '../types';
export declare function isNewMessage(msg: SendbirdMessage, currentUserId?: string): boolean;
export declare function isSendableMessage(msg?: SendbirdMessage | null): msg is SendbirdSendableMessage;
export declare function isMyMessage(msg?: SendbirdMessage | null, currentUserId?: string): msg is SendbirdSendableMessage;
export declare function messageKeyExtractor(message: SendbirdMessage): string;
export declare function messageComparator(a: SendbirdMessage, b: SendbirdMessage): number;
export declare function hasSameSender(a?: SendbirdMessage, b?: SendbirdMessage): boolean;
export declare function calcMessageGrouping(groupEnabled: boolean, curr: SendbirdMessage, prev?: SendbirdMessage, next?: SendbirdMessage): {
    groupWithPrev: boolean;
    groupWithNext: boolean;
};
export declare function getMessageUniqId(msg: SendbirdBaseMessage): string;
export declare function getThumbnailUriFromFileMessage(message: SendbirdFileMessage): string;
export declare function getAvailableUriFromFileMessage(message: SendbirdFileMessage): string;
type RawSendbirdDataPayload = {
    sendbird: string | object;
};
export declare function isSendbirdNotification(dataPayload?: {
    [key: string]: string | object;
}): dataPayload is RawSendbirdDataPayload;
export declare function parseSendbirdNotification(dataPayload: RawSendbirdDataPayload): SendbirdDataPayload;
export declare function shouldRenderParentMessage(message: SendbirdMessage): message is (SendbirdUserMessage | SendbirdFileMessage) & {
    parentMessage: SendbirdUserMessage | SendbirdFileMessage;
};
export declare function shouldRenderReaction(channel: SendbirdBaseChannel, reactionEnabled: boolean): boolean;
export declare function getReactionCount(reaction: SendbirdReaction): number;
export type MessageType = 'user' | 'admin' | 'file' | 'unknown' | `user.${'opengraph'}` | `file.${'image' | 'video' | 'audio' | 'voice'}`;
export type FileType = 'file' | 'image' | 'audio' | 'video';
declare const fileIconMapper: {
    readonly audio: "file-audio";
    readonly image: "photo";
    readonly video: "play";
    readonly file: "file-document";
};
type ValueOf<T> = T[keyof T];
export type FileIcon = ValueOf<typeof fileIconMapper>;
export declare function getFileTypeFromMessage(message: SendbirdFileMessage): FileType;
export declare const convertFileTypeToMessageType: (fileType?: FileType) => MessageType;
export declare const getFileIconFromMessageType: (messageType: MessageType) => FileIcon;
export declare const getFileIconFromMessage: (message: SendbirdFileMessage) => FileIcon;
export declare function getMessageType(message: SendbirdMessage): MessageType;
export declare function getDefaultMessageSearchQueryParams(channel: SendbirdGroupChannel, keyword: string): {
    keyword: string;
    channelUrl: string;
    messageTimestampFrom: number;
    order: MessageSearchOrder;
};
export declare function isVoiceMessage(message: SendbirdMessage): message is SendbirdFileMessage;
export declare function getVoiceMessageFileObject(uri: string, extension?: string): {
    uri: string;
    type: string;
    name: string;
    size: number;
};
export declare function getVoiceMessageMimeType(extension?: string): string;
export {};
