import { SendbirdChannel } from '@sendbird/uikit-utils';
import { FileType } from '../platform/types';
export declare const useChannelInputItems: (channel: SendbirdChannel, sendFileMessage: (file: FileType) => void) => {
    icon?: "search" | "stop" | "photo" | "recording" | "message" | "done" | "user" | "add" | "chat-hide" | "chat-show" | "archive" | "arrow-left" | "audio-off-filled" | "audio-off" | "audio-on-filled" | "audio-on" | "ban" | "broadcast" | "camera" | "channels" | "chat-filled" | "chat" | "checkbox-off" | "checkbox-on" | "chevron-down" | "chevron-right" | "close" | "copy" | "create" | "delete" | "document" | "done-all" | "download" | "edit" | "emoji-more" | "error" | "file-audio" | "file-document" | "freeze" | "gif" | "info" | "leave" | "members" | "moderation" | "more" | "mute" | "notifications-filled" | "notifications-off-filled" | "notifications" | "operator" | "pause" | "play" | "plus" | "question" | "radio-off" | "radio-on" | "refresh" | "remove" | "reply-filled" | "reply" | "send" | "settings-filled" | "spinner" | "streaming" | "supergroup" | "theme" | "thumbnail-none" | "unarchive" | undefined;
    iconColor?: string | undefined;
    title: string;
    titleColor?: string | undefined;
    disabled?: boolean | undefined;
    onPress: () => void;
}[];
