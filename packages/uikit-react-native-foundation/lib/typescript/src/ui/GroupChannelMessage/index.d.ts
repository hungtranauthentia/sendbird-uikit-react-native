import type React from 'react';
import type { SendbirdGroupChannel, SendbirdMessage, SendbirdUser } from '@sendbird/uikit-utils';
import type { VoiceFileMessageState } from './Message.file.voice';
export type GroupChannelMessageProps<T extends SendbirdMessage, AdditionalProps = unknown> = {
    channel: SendbirdGroupChannel;
    message: T;
    variant?: 'outgoing' | 'incoming';
    strings?: {
        senderName?: string;
        sentDate?: string;
        edited?: string;
        fileName?: string;
        unknownTitle?: string;
        unknownDescription?: string;
    };
    children?: React.ReactNode;
    sendingStatus?: React.ReactNode;
    parentMessage?: React.ReactNode;
    groupedWithPrev: boolean;
    groupedWithNext: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    onPressAvatar?: () => void;
    onPressURL?: (url: string) => void;
    onPressMentionedUser?: (mentionedUser?: SendbirdUser) => void;
    onToggleVoiceMessage?: (state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>;
} & AdditionalProps;
declare const GroupChannelMessage: {
    User: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").UserMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    } & {
        regexTextPatterns?: import("../..").RegexTextPattern[] | undefined;
        renderRegexTextChildren?: ((message: import("@sendbird/chat/message").UserMessage) => string) | undefined;
    }) => React.JSX.Element;
    OpenGraphUser: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").UserMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    } & {
        regexTextPatterns?: import("../..").RegexTextPattern[] | undefined;
        renderRegexTextChildren?: ((message: import("@sendbird/chat/message").UserMessage) => string) | undefined;
    }) => React.JSX.Element;
    File: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").FileMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    }) => React.JSX.Element;
    ImageFile: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").FileMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    }) => React.JSX.Element;
    VideoFile: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").FileMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    } & {
        fetchThumbnailFromVideoSource: (uri: string) => Promise<{
            path: string;
        } | null>;
    }) => React.JSX.Element;
    VoiceFile: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").FileMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    } & {
        durationMetaArrayKey?: string | undefined;
        onUnmount: () => void;
    }) => React.JSX.Element;
    Admin: (props: {
        channel: SendbirdGroupChannel;
        message: import("@sendbird/chat/message").AdminMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    }) => React.JSX.Element;
    Unknown: (props: {
        channel: SendbirdGroupChannel;
        message: SendbirdMessage;
        variant?: "incoming" | "outgoing" | undefined;
        strings?: {
            senderName?: string | undefined;
            sentDate?: string | undefined;
            edited?: string | undefined;
            fileName?: string | undefined;
            unknownTitle?: string | undefined;
            unknownDescription?: string | undefined;
        } | undefined;
        children?: React.ReactNode;
        sendingStatus?: React.ReactNode;
        parentMessage?: React.ReactNode;
        groupedWithPrev: boolean;
        groupedWithNext: boolean;
        onPress?: (() => void) | undefined;
        onLongPress?: (() => void) | undefined;
        onPressAvatar?: (() => void) | undefined;
        onPressURL?: ((url: string) => void) | undefined;
        onPressMentionedUser?: ((mentionedUser?: SendbirdUser) => void) | undefined;
        onToggleVoiceMessage?: ((state: VoiceFileMessageState, setState: React.Dispatch<React.SetStateAction<VoiceFileMessageState>>) => Promise<void>) | undefined;
    }) => React.JSX.Element;
};
export default GroupChannelMessage;
