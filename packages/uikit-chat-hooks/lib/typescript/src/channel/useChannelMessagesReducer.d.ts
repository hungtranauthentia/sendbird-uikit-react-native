import type { SendbirdBaseMessage } from '@sendbird/uikit-utils';
import { SendbirdMessage } from '@sendbird/uikit-utils';
type Options = {
    sortComparator?: (a: SendbirdMessage, b: SendbirdMessage) => number;
};
export declare const useChannelMessagesReducer: (sortComparator?: Options['sortComparator']) => {
    updateLoading: (status: boolean) => void;
    updateRefreshing: (status: boolean) => void;
    updateMessages: (messages: SendbirdBaseMessage[], clearBeforeAction: boolean, currentUserId?: string) => void;
    deleteMessages: (messageIds: (string | number)[], reqIds: string[]) => void;
    loading: boolean;
    refreshing: boolean;
    messages: import("@sendbird/chat/message").BaseMessage[];
    newMessages: import("@sendbird/chat/message").BaseMessage[];
    updateNewMessages: (messages: SendbirdBaseMessage[], clearBeforeAction: boolean, currentUserId?: string) => void;
    deleteNewMessages: (messageIds: number[], reqIds: string[]) => void;
};
export {};
