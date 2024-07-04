import GroupChannelListHeader from '../component/GroupChannelListHeader';
import GroupChannelListList from '../component/GroupChannelListList';
import GroupChannelListStatusEmpty from '../component/GroupChannelListStatusEmpty';
import GroupChannelListStatusLoading from '../component/GroupChannelListStatusLoading';
import GroupChannelListTypeSelector from '../component/GroupChannelListTypeSelector';
import { GroupChannelListContextsProvider } from './moduleContext';
const createGroupChannelListModule = function () {
  let {
    Header = GroupChannelListHeader,
    List = GroupChannelListList,
    TypeSelector = GroupChannelListTypeSelector,
    StatusLoading = GroupChannelListStatusLoading,
    StatusEmpty = GroupChannelListStatusEmpty,
    Provider = GroupChannelListContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    TypeSelector,
    StatusLoading,
    StatusEmpty,
    Provider,
    ...module
  };
};
export default createGroupChannelListModule;
//# sourceMappingURL=createGroupChannelListModule.js.map