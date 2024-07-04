import React from 'react';
import { SBUConfig } from '@sendbird/uikit-tools';
import type { SendbirdChatSDK, SendbirdGroupChannel, SendbirdUser } from '@sendbird/uikit-utils';
import type EmojiManager from '../libs/EmojiManager';
import type ImageCompressionConfig from '../libs/ImageCompressionConfig';
import type MentionManager from '../libs/MentionManager';
import type VoiceMessageConfig from '../libs/VoiceMessageConfig';
import type { FileType } from '../platform/types';
export interface ChatRelatedFeaturesInUIKit {
    enableAutoPushTokenRegistration: boolean;
    enableUseUserIdForNickname: boolean;
    enableImageCompression: boolean;
}
interface Props extends ChatRelatedFeaturesInUIKit, React.PropsWithChildren {
    sdkInstance: SendbirdChatSDK;
    emojiManager: EmojiManager;
    mentionManager: MentionManager;
    imageCompressionConfig: ImageCompressionConfig;
    voiceMessageConfig: VoiceMessageConfig;
}
export type SendbirdChatContextType = {
    sdk: SendbirdChatSDK;
    currentUser?: SendbirdUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<SendbirdUser | undefined>>;
    emojiManager: EmojiManager;
    mentionManager: MentionManager;
    imageCompressionConfig: ImageCompressionConfig;
    voiceMessageConfig: VoiceMessageConfig;
    updateCurrentUserInfo: (nickname?: string, profile?: string | FileType) => Promise<SendbirdUser>;
    markAsDeliveredWithChannel: (channel: SendbirdGroupChannel) => void;
    sbOptions: {
        uikit: SBUConfig;
        uikitWithAppInfo: {
            groupChannel: {
                channel: {
                    readonly enableReactions: boolean;
                    readonly enableReactionsSupergroup: boolean;
                    readonly enableOgtag: boolean;
                };
                setting: {
                    readonly enableMessageSearch: boolean;
                };
            };
            openChannel: {
                channel: {
                    readonly enableOgtag: boolean;
                };
            };
        };
        chat: {
            imageCompressionEnabled: boolean;
            useUserIdForNicknameEnabled: boolean;
            autoPushTokenRegistrationEnabled: boolean;
        };
        appInfo: {
            deliveryReceiptEnabled: boolean;
            broadcastChannelEnabled: boolean;
            superGroupChannelEnabled: boolean;
            reactionEnabled: boolean;
        };
    };
};
export declare const SendbirdChatContext: React.Context<SendbirdChatContextType | null>;
export declare const SendbirdChatProvider: ({ children, sdkInstance, emojiManager, mentionManager, imageCompressionConfig, voiceMessageConfig, enableAutoPushTokenRegistration, enableUseUserIdForNickname, enableImageCompression, }: Props) => React.JSX.Element;
export {};
