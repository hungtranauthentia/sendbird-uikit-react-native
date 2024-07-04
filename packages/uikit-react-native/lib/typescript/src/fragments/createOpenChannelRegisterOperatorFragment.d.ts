import type { SendbirdParticipant } from '@sendbird/uikit-utils';
import type { OpenChannelRegisterOperatorFragment } from '../domain/openChannelUserList/types';
import type { UserListModule } from '../domain/userList/types';
declare const createOpenChannelRegisterOperatorFragment: (initModule?: Partial<UserListModule<SendbirdParticipant>>) => OpenChannelRegisterOperatorFragment;
export default createOpenChannelRegisterOperatorFragment;
