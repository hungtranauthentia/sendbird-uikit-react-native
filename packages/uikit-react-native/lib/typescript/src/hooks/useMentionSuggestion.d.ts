import type { SendbirdChatSDK, SendbirdGroupChannel, SendbirdUser } from '@sendbird/uikit-utils';
import type { Range } from '../types';
declare const useMentionSuggestion: (params: {
    text: string;
    selection: Range;
    mentionedUsers: {
        user: SendbirdUser;
        range: Range;
    }[];
    sdk: SendbirdChatSDK;
    channel: SendbirdGroupChannel;
}) => {
    members: import("@sendbird/chat/groupChannel").Member[];
    reset: () => void;
    searchStringRange: Range;
    searchLimited: boolean;
};
export default useMentionSuggestion;
