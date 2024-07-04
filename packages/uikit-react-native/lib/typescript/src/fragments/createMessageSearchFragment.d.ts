import type { MessageSearchFragment, MessageSearchModule } from '../domain/messageSearch/types';
declare const createMessageSearchFragment: (initModule?: Partial<MessageSearchModule>) => MessageSearchFragment;
export default createMessageSearchFragment;
