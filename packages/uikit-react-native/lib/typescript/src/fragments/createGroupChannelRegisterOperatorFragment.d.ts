import type { SendbirdMember } from '@sendbird/uikit-utils';
import type { GroupChannelRegisterOperatorFragment } from '../domain/groupChannelUserList/types';
import type { UserListModule } from '../domain/userList/types';
declare const createGroupChannelRegisterOperatorFragment: (initModule?: Partial<UserListModule<SendbirdMember>>) => GroupChannelRegisterOperatorFragment;
export default createGroupChannelRegisterOperatorFragment;
