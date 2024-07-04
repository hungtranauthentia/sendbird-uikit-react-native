import UserListHeader from '../component/UserListHeader';
import UserListList from '../component/UserListList';
import UserListStatusEmpty from '../component/UserListStatusEmpty';
import UserListStatusError from '../component/UserListStatusError';
import UserListStatusLoading from '../component/UserListStatusLoading';
import { UserListContextsProvider } from './moduleContext';
const createUserListModule = function () {
  let {
    Header = UserListHeader,
    List = UserListList,
    StatusLoading = UserListStatusLoading,
    StatusEmpty = UserListStatusEmpty,
    StatusError = UserListStatusError,
    Provider = UserListContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    StatusLoading,
    StatusEmpty,
    StatusError,
    Provider,
    ...module
  };
};
export default createUserListModule;
//# sourceMappingURL=createUserListModule.js.map