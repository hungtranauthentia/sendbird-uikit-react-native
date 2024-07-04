import type { MessageSearchModule } from '../types';
declare const createMessageSearchModule: ({ Header, List, StatusError, StatusLoading, StatusEmpty, Provider, ...module }?: Partial<MessageSearchModule>) => MessageSearchModule;
export default createMessageSearchModule;
