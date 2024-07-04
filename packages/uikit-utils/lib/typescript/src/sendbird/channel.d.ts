import type { SendbirdBaseChannel, SendbirdChannel, SendbirdGroupChannel, SendbirdGroupChannelCreateParams, SendbirdOpenChannel } from '../types';
/**
 * Diff utils for channel
 * @param {SendbirdBaseChannel} [a]
 * @param {SendbirdBaseChannel} [b]
 * @returns {boolean}
 * */
export declare function isDifferentChannel<T extends SendbirdBaseChannel>(a?: T, b?: T): boolean;
export declare const getGroupChannelChatAvailableState: (channel: SendbirdGroupChannel) => {
    disabled: boolean;
    frozen: boolean;
    muted: boolean;
};
export declare const getOpenChannelChatAvailableState: (channel: SendbirdOpenChannel, userId: string) => Promise<{
    disabled: boolean;
    frozen: boolean;
    muted: boolean;
}>;
export declare const confirmAndMarkAsRead: (channels: SendbirdBaseChannel[]) => Promise<void>;
export declare const confirmAndMarkAsDelivered: (channels: SendbirdBaseChannel[]) => Promise<void>;
export declare function isDefaultCoverImage(coverUrl: string): boolean;
export declare function getMembersExcludeMe(channel: SendbirdGroupChannel, currentUserId?: string): import("@sendbird/chat/groupChannel").Member[];
export declare function getGroupChannels(channels: SendbirdChannel[]): SendbirdGroupChannel[];
export declare function getOpenChannels(channels: SendbirdChannel[]): SendbirdOpenChannel[];
export declare function getChannelUniqId(channel: SendbirdChannel): string;
export declare function getDefaultGroupChannelCreateParams(params: {
    invitedUserIds: string[];
    currentUserId?: string;
}): SendbirdGroupChannelCreateParams;
