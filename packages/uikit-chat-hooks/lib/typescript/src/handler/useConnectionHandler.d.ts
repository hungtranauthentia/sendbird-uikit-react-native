import { ConnectionHandler } from '@sendbird/chat';
import { SendbirdChatSDK } from '@sendbird/uikit-utils';
export declare const useConnectionHandler: (sdk: SendbirdChatSDK, handlerId: string, hookHandler: Partial<ConnectionHandler>) => void;
