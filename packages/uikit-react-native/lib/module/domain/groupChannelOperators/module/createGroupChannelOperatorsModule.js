import GroupChannelOperatorsHeader from '../component/GroupChannelOperatorsHeader';
import GroupChannelOperatorsList from '../component/GroupChannelOperatorsList';
import GroupChannelOperatorsStatusEmpty from '../component/GroupChannelOperatorsStatusEmpty';
import GroupChannelOperatorsStatusError from '../component/GroupChannelOperatorsStatusError';
import GroupChannelOperatorsStatusLoading from '../component/GroupChannelOperatorsStatusLoading';
import { GroupChannelOperatorsContextsProvider } from './moduleContext';
const createGroupChannelOperatorsModule = function () {
  let {
    Header = GroupChannelOperatorsHeader,
    List = GroupChannelOperatorsList,
    StatusEmpty = GroupChannelOperatorsStatusEmpty,
    StatusError = GroupChannelOperatorsStatusError,
    StatusLoading = GroupChannelOperatorsStatusLoading,
    Provider = GroupChannelOperatorsContextsProvider,
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
export default createGroupChannelOperatorsModule;
//# sourceMappingURL=createGroupChannelOperatorsModule.js.map