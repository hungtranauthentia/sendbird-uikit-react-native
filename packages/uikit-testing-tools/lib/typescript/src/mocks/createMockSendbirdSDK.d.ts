import { ConnectionHandler, UserEventHandler } from '@sendbird/chat';
import type { GroupChannelCollectionEventHandler, GroupChannelHandler, MessageCollectionEventHandler } from '@sendbird/chat/groupChannel';
import type { AppInfo, ConnectionHandlerParams, GroupChannelHandlerParams, OpenChannelHandlerParams, UserEventHandlerParams } from '@sendbird/chat/lib/__definition';
import type { OpenChannelHandler } from '@sendbird/chat/openChannel';
import type { SendbirdChatSDK, SendbirdGroupChannel, SendbirdGroupChannelCollection, SendbirdOpenChannel } from '@sendbird/uikit-utils';
export interface MockSendbirdChatSDK extends SendbirdChatSDK {
    __emit(type: 'channel' | 'connection' | 'userEvent', name: `group_${keyof GroupChannelHandlerParams}` | `open_${keyof OpenChannelHandlerParams}` | keyof ConnectionHandlerParams | keyof UserEventHandlerParams, ...args: unknown[]): void;
    __context: {
        openChannels: SendbirdOpenChannel[];
        groupChannels: SendbirdGroupChannel[];
        groupChannelCollections: SendbirdGroupChannelCollection[];
        groupChannelHandlers: Record<string, GroupChannelHandler>;
        openChannelHandlers: Record<string, OpenChannelHandler>;
        connectionHandlers: Record<string, ConnectionHandler>;
        userEventHandlers: Record<string, UserEventHandler>;
        groupChannelCollectionHandlers: Record<string, GroupChannelCollectionEventHandler>;
        groupChannelMessageCollectionHandlers: Record<string, Record<string, MessageCollectionEventHandler>>;
        appInfo: AppInfo;
        localCacheEnabled: boolean;
    };
    __params: InitParams;
    __throwIfFailureTest(): void;
}
type InitParams = {
    testType?: 'success' | 'failure';
    userId?: string;
    appInfo?: Partial<AppInfo>;
    localCacheEnabled?: boolean;
};
export declare const createMockSendbirdChat: (params?: InitParams) => MockSendbirdChatSDK;
export {};
