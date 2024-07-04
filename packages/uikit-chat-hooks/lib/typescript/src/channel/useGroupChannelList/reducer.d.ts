import type { SendbirdChannel } from '@sendbird/uikit-utils';
type Order = 'latest_last_message' | 'chronological' | 'channel_name_alphabetical' | 'metadata_value_alphabetical';
export declare const useGroupChannelListReducer: (order?: Order) => {
    updateLoading: (status: boolean) => void;
    updateRefreshing: (status: boolean) => void;
    updateChannels: (channels: SendbirdChannel[]) => void;
    deleteChannels: (channelUrls: string[]) => void;
    appendChannels: (channels: SendbirdChannel[], clearBeforeAction: boolean) => void;
    updateOrder: (order?: Order) => void;
    loading: boolean;
    refreshing: boolean;
    groupChannels: import("@sendbird/chat/groupChannel").GroupChannel[];
};
export {};
