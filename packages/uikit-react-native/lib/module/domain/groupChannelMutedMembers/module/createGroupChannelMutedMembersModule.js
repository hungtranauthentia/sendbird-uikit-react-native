import GroupChannelMutedMembersHeader from '../component/GroupChannelMutedMembersHeader';
import GroupChannelMutedMembersList from '../component/GroupChannelMutedMembersList';
import GroupChannelMutedMembersStatusEmpty from '../component/GroupChannelMutedMembersStatusEmpty';
import GroupChannelMutedMembersStatusError from '../component/GroupChannelMutedMembersStatusError';
import GroupChannelMutedMembersStatusLoading from '../component/GroupChannelMutedMembersStatusLoading';
import { GroupChannelMutedMembersContextsProvider } from './moduleContext';
const createGroupChannelMutedMembersModule = function () {
  let {
    Header = GroupChannelMutedMembersHeader,
    List = GroupChannelMutedMembersList,
    StatusEmpty = GroupChannelMutedMembersStatusEmpty,
    StatusError = GroupChannelMutedMembersStatusError,
    StatusLoading = GroupChannelMutedMembersStatusLoading,
    Provider = GroupChannelMutedMembersContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    Provider,
    StatusEmpty,
    StatusError,
    StatusLoading,
    ...module
  };
};
export default createGroupChannelMutedMembersModule;
//# sourceMappingURL=createGroupChannelMutedMembersModule.js.map