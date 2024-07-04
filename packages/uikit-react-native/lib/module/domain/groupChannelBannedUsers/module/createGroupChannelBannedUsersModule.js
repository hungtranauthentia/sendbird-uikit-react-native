import GroupChannelBannedUsersHeader from '../component/GroupChannelBannedUsersHeader';
import GroupChannelBannedUsersList from '../component/GroupChannelBannedUsersList';
import GroupChannelBannedUsersStatusEmpty from '../component/GroupChannelBannedUsersStatusEmpty';
import GroupChannelBannedUsersStatusError from '../component/GroupChannelBannedUsersStatusError';
import GroupChannelBannedUsersStatusLoading from '../component/GroupChannelBannedUsersStatusLoading';
import { GroupChannelBannedUsersContextsProvider } from './moduleContext';
const createGroupChannelBannedUsersModule = function () {
  let {
    Header = GroupChannelBannedUsersHeader,
    List = GroupChannelBannedUsersList,
    StatusLoading = GroupChannelBannedUsersStatusLoading,
    StatusEmpty = GroupChannelBannedUsersStatusEmpty,
    StatusError = GroupChannelBannedUsersStatusError,
    Provider = GroupChannelBannedUsersContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    Provider,
    StatusEmpty,
    StatusLoading,
    StatusError,
    ...module
  };
};
export default createGroupChannelBannedUsersModule;
//# sourceMappingURL=createGroupChannelBannedUsersModule.js.map