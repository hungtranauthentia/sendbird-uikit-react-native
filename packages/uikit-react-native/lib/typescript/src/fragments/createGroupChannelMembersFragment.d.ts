import type { SendbirdMember } from '@sendbird/uikit-utils';
import type { GroupChannelMembersFragment } from '../domain/groupChannelUserList/types';
import type { UserListModule } from '../domain/userList/types';
declare const createGroupChannelMembersFragment: (initModule?: Partial<UserListModule<SendbirdMember>>) => GroupChannelMembersFragment;
export default createGroupChannelMembersFragment;
