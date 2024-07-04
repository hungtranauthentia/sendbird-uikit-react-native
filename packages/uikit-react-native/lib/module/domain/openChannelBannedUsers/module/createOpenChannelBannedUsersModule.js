import OpenChannelBannedUsersHeader from '../component/OpenChannelBannedUsersHeader';
import OpenChannelBannedUsersList from '../component/OpenChannelBannedUsersList';
import OpenChannelBannedUsersStatusEmpty from '../component/OpenChannelBannedUsersStatusEmpty';
import OpenChannelBannedUsersStatusError from '../component/OpenChannelBannedUsersStatusError';
import OpenChannelBannedUsersStatusLoading from '../component/OpenChannelBannedUsersStatusLoading';
import { OpenChannelBannedUsersContextsProvider } from './moduleContext';
const createOpenChannelBannedUsersModule = function () {
  let {
    Header = OpenChannelBannedUsersHeader,
    List = OpenChannelBannedUsersList,
    StatusLoading = OpenChannelBannedUsersStatusLoading,
    StatusEmpty = OpenChannelBannedUsersStatusEmpty,
    StatusError = OpenChannelBannedUsersStatusError,
    Provider = OpenChannelBannedUsersContextsProvider,
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
export default createOpenChannelBannedUsersModule;
//# sourceMappingURL=createOpenChannelBannedUsersModule.js.map