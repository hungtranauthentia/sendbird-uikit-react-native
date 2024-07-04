import type { SendbirdChannel } from '@sendbird/uikit-utils';
export declare const useOpenChannelListReducer: () => {
    updateError: (error: unknown | null) => void;
    updateLoading: (status: boolean) => void;
    updateRefreshing: (status: boolean) => void;
    updateChannels: (channels: SendbirdChannel[]) => void;
    deleteChannels: (channelUrls: string[]) => void;
    appendChannels: (channels: SendbirdChannel[], clearBeforeAction: boolean) => void;
    error: unknown;
    loading: boolean;
    refreshing: boolean;
    openChannels: import("@sendbird/chat/openChannel").OpenChannel[];
};
