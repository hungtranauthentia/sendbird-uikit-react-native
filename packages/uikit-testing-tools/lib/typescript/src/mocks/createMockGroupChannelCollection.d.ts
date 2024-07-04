/// <reference types="jest" />
import { GroupChannel, GroupChannelCollectionEventHandler, GroupChannelCollectionParams, GroupChannelFilter, GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import type { SendbirdGroupChannelCollection } from '@sendbird/uikit-utils';
import type { GetMockParams, GetMockProps } from '../types';
type Params = GetMockParams<GroupChannelCollectionParams & {
    hasMore: boolean;
}>;
export declare const createMockGroupChannelCollection: (params: Params) => MockGroupChannelCollection;
declare class MockGroupChannelCollection implements GetMockProps<Params, SendbirdGroupChannelCollection> {
    params: Params;
    constructor(params: Params);
    __handlerId?: string;
    channels: GroupChannel[];
    filter: GroupChannelFilter;
    order: GroupChannelListOrder;
    dispose: jest.Mock<void, [], any>;
    hasMore: boolean;
    loadMore: jest.Mock<Promise<GroupChannel[]>, [], any>;
    setGroupChannelCollectionHandler: jest.Mock<void, [handler: GroupChannelCollectionEventHandler], any>;
}
export {};
