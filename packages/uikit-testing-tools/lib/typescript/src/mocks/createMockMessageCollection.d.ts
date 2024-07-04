/// <reference types="jest" />
import { MessageCollectionEventHandler, MessageCollectionInitHandler, MessageCollectionInitPolicy, MessageCollectionInitResultHandler, MessageCollectionParams, MessageFilter } from '@sendbird/chat/groupChannel';
import { BaseMessage } from '@sendbird/chat/message';
import type { SendbirdBaseMessage, SendbirdGroupChannel, SendbirdMessageCollection, SendbirdSendableMessage } from '@sendbird/uikit-utils';
import type { GetMockParams, GetMockProps } from '../types';
type Params = GetMockParams<MessageCollectionParams & {
    groupChannel: SendbirdGroupChannel;
    dataLength: number;
}>;
export declare const createMockMessageCollection: (params: Params) => MockMessageCollection;
declare class MockMessageCollection implements GetMockProps<Params, Omit<SendbirdMessageCollection, 'viewTop' | 'viewBottom'>> {
    params: Params;
    constructor(params: Params);
    __handlerId?: string;
    __messages: SendbirdBaseMessage[];
    __cursor: number;
    __fetchedMessage: SendbirdBaseMessage[];
    __initialized: boolean;
    __apiInitHandler: MessageCollectionInitResultHandler;
    __cacheInitHandler: MessageCollectionInitResultHandler;
    setMessageCollectionHandler: jest.Mock<void, [handler: MessageCollectionEventHandler], any>;
    initialize: jest.Mock<MessageCollectionInitHandler<BaseMessage>, [_policy: MessageCollectionInitPolicy], any>;
    dispose: jest.Mock<void, [], any>;
    removeFailedMessage: jest.Mock<any, any, any>;
    loadNext: jest.Mock<Promise<never[]>, [], any>;
    loadPrevious: jest.Mock<Promise<BaseMessage[]>, [], any>;
    filter: MessageFilter;
    get channel(): SendbirdGroupChannel;
    get hasNext(): boolean;
    get hasPrevious(): boolean;
    get failedMessages(): SendbirdSendableMessage[];
    get pendingMessages(): SendbirdSendableMessage[];
    get succeededMessages(): SendbirdBaseMessage[];
    asMessageCollection(): import("@sendbird/chat/groupChannel").MessageCollection;
}
export {};
