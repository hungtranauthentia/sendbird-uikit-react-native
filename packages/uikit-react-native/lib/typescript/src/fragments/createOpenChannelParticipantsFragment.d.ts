import type { SendbirdParticipant } from '@sendbird/uikit-utils';
import type { OpenChannelParticipantsFragment } from '../domain/openChannelUserList/types';
import type { UserListModule } from '../domain/userList/types';
declare const createOpenChannelParticipantsFragment: (initModule?: Partial<UserListModule<SendbirdParticipant>>) => OpenChannelParticipantsFragment;
export default createOpenChannelParticipantsFragment;
