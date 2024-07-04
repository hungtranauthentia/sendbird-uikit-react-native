import { SendbirdChatSDK } from '@sendbird/uikit-utils';
export declare const useGroupChannel: (sdk: SendbirdChatSDK, channelUrl: string) => {
    loading: boolean;
    channel?: import("@sendbird/chat/groupChannel").GroupChannel | undefined;
    error?: unknown;
};
