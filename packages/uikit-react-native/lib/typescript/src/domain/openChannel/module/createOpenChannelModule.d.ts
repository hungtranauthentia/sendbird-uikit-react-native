import type { OpenChannelModule } from '../types';
declare const createOpenChannelModule: ({ Header, MessageList, Input, StatusLoading, StatusEmpty, Provider, ...module }?: Partial<OpenChannelModule>) => OpenChannelModule;
export default createOpenChannelModule;
