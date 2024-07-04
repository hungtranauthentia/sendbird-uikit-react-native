import OpenChannelListHeader from '../component/OpenChannelListHeader';
import OpenChannelListList from '../component/OpenChannelListList';
import OpenChannelListStatusEmpty from '../component/OpenChannelListStatusEmpty';
import OpenChannelListStatusError from '../component/OpenChannelListStatusError';
import OpenChannelListStatusLoading from '../component/OpenChannelListStatusLoading';
import { OpenChannelListContextsProvider } from './moduleContext';
const createOpenChannelListModule = function () {
  let {
    Header = OpenChannelListHeader,
    List = OpenChannelListList,
    StatusLoading = OpenChannelListStatusLoading,
    StatusEmpty = OpenChannelListStatusEmpty,
    StatusError = OpenChannelListStatusError,
    Provider = OpenChannelListContextsProvider,
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
export default createOpenChannelListModule;
//# sourceMappingURL=createOpenChannelListModule.js.map