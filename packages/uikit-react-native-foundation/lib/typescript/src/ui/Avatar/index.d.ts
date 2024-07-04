import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    uri?: string;
    size?: number;
    square?: boolean;
    muted?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
};
declare const _default: (({ uri, square, muted, size, containerStyle }: Props) => React.JSX.Element) & {
    Group: ({ children, containerStyle, size }: {
        size?: number | undefined;
        containerStyle?: StyleProp<ViewStyle>;
    } & {
        children?: React.ReactNode;
    }) => React.JSX.Element;
    Icon: ({ size, icon, containerStyle, backgroundColor }: {
        icon: "message" | "recording" | "done" | "search" | "chat-hide" | "chat-show" | "add" | "archive" | "arrow-left" | "audio-off-filled" | "audio-off" | "audio-on-filled" | "audio-on" | "ban" | "broadcast" | "camera" | "channels" | "chat-filled" | "chat" | "checkbox-off" | "checkbox-on" | "chevron-down" | "chevron-right" | "close" | "copy" | "create" | "delete" | "document" | "done-all" | "download" | "edit" | "emoji-more" | "error" | "file-audio" | "file-document" | "freeze" | "gif" | "info" | "leave" | "members" | "moderation" | "more" | "mute" | "notifications-filled" | "notifications-off-filled" | "notifications" | "operator" | "pause" | "photo" | "play" | "plus" | "question" | "radio-off" | "radio-on" | "refresh" | "remove" | "reply-filled" | "reply" | "send" | "settings-filled" | "spinner" | "stop" | "streaming" | "supergroup" | "theme" | "thumbnail-none" | "unarchive" | "user";
        size?: number | undefined;
        backgroundColor?: string | undefined;
        containerStyle?: StyleProp<ViewStyle>;
    }) => React.JSX.Element;
    Stack: ({ children, containerStyle, styles, maxAvatar, size, avatarGap, }: {
        size?: number | undefined;
        containerStyle?: StyleProp<ViewStyle>;
        maxAvatar?: number | undefined;
        avatarGap?: number | undefined;
        styles?: {
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            remainsTextColor?: string | undefined;
            remainsBackgroundColor?: string | undefined;
        } | undefined;
    } & {
        children?: React.ReactNode;
    }) => React.JSX.Element;
};
export default _default;
