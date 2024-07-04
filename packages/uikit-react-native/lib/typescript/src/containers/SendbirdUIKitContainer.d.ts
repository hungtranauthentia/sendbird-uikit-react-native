import React from 'react';
import { SendbirdChatParams } from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { OpenChannelModule } from '@sendbird/chat/openChannel';
import type { HeaderStyleContextType, UIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { SBUConfig } from '@sendbird/uikit-tools';
import type { PartialDeep, SendbirdChatSDK, SendbirdGroupChannel, SendbirdGroupChannelCreateParams, SendbirdMember, SendbirdUser } from '@sendbird/uikit-utils';
import type { ChatRelatedFeaturesInUIKit } from '../contexts/SendbirdChatCtx';
import type { ImageCompressionConfigInterface } from '../libs/ImageCompressionConfig';
import { MentionConfigInterface } from '../libs/MentionConfig';
import { VoiceMessageConfigInterface } from '../libs/VoiceMessageConfig';
import type { StringSet } from '../localization/StringSet.type';
import type { ClipboardServiceInterface, FileServiceInterface, MediaServiceInterface, NotificationServiceInterface, PlayerServiceInterface, RecorderServiceInterface } from '../platform/types';
import type { ErrorBoundaryProps, LocalCacheStorage } from '../types';
export declare const SendbirdUIKit: Readonly<{
    VERSION: "3.5.4";
    PLATFORM: string;
    DEFAULT: {
        AUTO_PUSH_TOKEN_REGISTRATION: boolean;
        USE_USER_ID_FOR_NICKNAME: boolean;
        IMAGE_COMPRESSION: boolean;
    };
}>;
type UnimplementedFeatures = 'threadReplySelectType' | 'replyType' | 'enableReactionsSupergroup';
export type ChatOmittedInitParams = Omit<SendbirdChatParams<[GroupChannelModule, OpenChannelModule]>, (typeof chatOmitKeys)[number]>;
declare const chatOmitKeys: readonly ["appId", "newInstance", "modules", "debugMode", "appVersion", "localCacheEnabled", "useAsyncStorageStore"];
export type SendbirdUIKitContainerProps = React.PropsWithChildren<{
    appId: string;
    platformServices: {
        file: FileServiceInterface;
        notification: NotificationServiceInterface;
        clipboard: ClipboardServiceInterface;
        media: MediaServiceInterface;
        player: PlayerServiceInterface;
        recorder: RecorderServiceInterface;
    };
    chatOptions: {
        localCacheStorage: LocalCacheStorage;
        onInitialized?: (sdkInstance: SendbirdChatSDK) => SendbirdChatSDK;
    } & Partial<ChatOmittedInitParams> & Partial<ChatRelatedFeaturesInUIKit>;
    uikitOptions?: PartialDeep<{
        common: SBUConfig['common'];
        groupChannel: Omit<SBUConfig['groupChannel']['channel'], UnimplementedFeatures> & {
            replyType: Extract<SBUConfig['groupChannel']['channel']['replyType'], 'none' | 'quote_reply'>;
            /**
             * @deprecated Currently, this feature is turned off by default. If you wish to use this feature, contact us: {@link https://dashboard.sendbird.com/settings/contact_us?category=feedback_and_feature_requests&product=UIKit}
             */
            enableReactionsSupergroup: never;
        };
        groupChannelList: SBUConfig['groupChannel']['channelList'];
        groupChannelSettings: SBUConfig['groupChannel']['setting'];
        openChannel: SBUConfig['openChannel']['channel'];
    }>;
    localization?: {
        stringSet?: StringSet;
    };
    styles?: {
        theme?: UIKitTheme;
        statusBarTranslucent?: boolean;
        defaultHeaderTitleAlign?: 'left' | 'center';
        defaultHeaderHeight?: number;
        HeaderComponent?: HeaderStyleContextType['HeaderComponent'];
    };
    errorBoundary?: {
        disabled?: boolean;
        onError?: (props: ErrorBoundaryProps) => void;
        ErrorInfoComponent?: (props: ErrorBoundaryProps) => React.ReactNode;
    };
    toast?: {
        dismissTimeout?: number;
    };
    userProfile?: {
        onCreateChannel: (channel: SendbirdGroupChannel) => void;
        onBeforeCreateChannel?: (channelParams: SendbirdGroupChannelCreateParams, users: SendbirdUser[] | SendbirdMember[]) => SendbirdGroupChannelCreateParams | Promise<SendbirdGroupChannelCreateParams>;
    };
    reaction?: {
        onPressUserProfile?: (user: SendbirdUser | SendbirdMember) => void;
    };
    userMention?: Pick<Partial<MentionConfigInterface>, 'mentionLimit' | 'suggestionLimit' | 'debounceMills'>;
    imageCompression?: Partial<ImageCompressionConfigInterface>;
    voiceMessage?: PartialDeep<VoiceMessageConfigInterface>;
}>;
declare const SendbirdUIKitContainer: (props: SendbirdUIKitContainerProps) => React.JSX.Element;
export default SendbirdUIKitContainer;
