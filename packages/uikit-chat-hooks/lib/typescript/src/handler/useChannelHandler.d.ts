import { GroupChannelHandler } from '@sendbird/chat/groupChannel';
import { OpenChannelHandler } from '@sendbird/chat/openChannel';
import type { SendbirdChatSDK } from '@sendbird/uikit-utils';
type ChannelType = 'open' | 'group';
export declare const useChannelHandler: <T extends ChannelType = "group">(sdk: SendbirdChatSDK, handlerId: string, hookHandler: Partial<T extends "group" ? GroupChannelHandler : OpenChannelHandler>, type?: T) => void;
export {};
