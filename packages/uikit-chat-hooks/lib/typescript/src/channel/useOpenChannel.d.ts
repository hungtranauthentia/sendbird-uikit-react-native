import { SendbirdChatSDK } from '@sendbird/uikit-utils';
export declare const useOpenChannel: (sdk: SendbirdChatSDK, channelUrl: string) => {
    loading: boolean;
    channel?: import("@sendbird/chat/openChannel").OpenChannel | undefined;
    error?: unknown;
};
