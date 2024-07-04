import React from 'react';
import VoiceMessageConfig from '../libs/VoiceMessageConfig';
import type { ClipboardServiceInterface, FileServiceInterface, MediaServiceInterface, NotificationServiceInterface, PlayerServiceInterface, RecorderServiceInterface } from '../platform/types';
export type PlatformServiceContextType = {
    fileService: FileServiceInterface;
    clipboardService: ClipboardServiceInterface;
    notificationService: NotificationServiceInterface;
    mediaService: MediaServiceInterface;
    recorderService: RecorderServiceInterface;
    playerService: PlayerServiceInterface;
};
type Props = React.PropsWithChildren<PlatformServiceContextType & {
    voiceMessageConfig: VoiceMessageConfig;
}>;
export declare const PlatformServiceContext: React.Context<PlatformServiceContextType | null>;
export declare const PlatformServiceProvider: ({ children, voiceMessageConfig, ...services }: Props) => React.JSX.Element;
export {};
