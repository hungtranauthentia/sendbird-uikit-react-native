import React from 'react';
import type { SendbirdGroupChannel, SendbirdGroupChannelCreateParams, SendbirdMember, SendbirdUser } from '@sendbird/uikit-utils';
type OnCreateChannel = (channel: SendbirdGroupChannel) => void;
type OnBeforeCreateChannel = (channelParams: SendbirdGroupChannelCreateParams, users: SendbirdUser[] | SendbirdMember[]) => SendbirdGroupChannelCreateParams | Promise<SendbirdGroupChannelCreateParams>;
type ShowOptions = {
    hideMessageButton?: boolean;
};
export type UserProfileContextType = {
    show(user: SendbirdUser | SendbirdMember, options?: ShowOptions): void;
    hide(): void;
};
type Props = React.PropsWithChildren<{
    onCreateChannel?: OnCreateChannel;
    onBeforeCreateChannel?: OnBeforeCreateChannel;
    statusBarTranslucent?: boolean;
}>;
export declare const UserProfileContext: React.Context<UserProfileContextType | null>;
export declare const UserProfileProvider: ({ children, onCreateChannel, onBeforeCreateChannel, statusBarTranslucent, }: Props) => React.JSX.Element;
export {};
