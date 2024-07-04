import type { OpenChannelListModule } from '../types';
declare const createOpenChannelListModule: ({ Header, List, StatusLoading, StatusEmpty, StatusError, Provider, ...module }?: Partial<OpenChannelListModule>) => OpenChannelListModule;
export default createOpenChannelListModule;
