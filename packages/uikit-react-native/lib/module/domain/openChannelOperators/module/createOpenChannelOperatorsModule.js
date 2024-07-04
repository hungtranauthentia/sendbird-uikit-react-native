import OpenChannelOperatorsHeader from '../component/OpenChannelOperatorsHeader';
import OpenChannelOperatorsList from '../component/OpenChannelOperatorsList';
import OpenChannelOperatorsStatusEmpty from '../component/OpenChannelOperatorsStatusEmpty';
import OpenChannelOperatorsStatusError from '../component/OpenChannelOperatorsStatusError';
import OpenChannelOperatorsStatusLoading from '../component/OpenChannelOperatorsStatusLoading';
import { OpenChannelOperatorsContextsProvider } from './moduleContext';
const createOpenChannelOperatorsModule = function () {
  let {
    Header = OpenChannelOperatorsHeader,
    List = OpenChannelOperatorsList,
    StatusLoading = OpenChannelOperatorsStatusLoading,
    StatusEmpty = OpenChannelOperatorsStatusEmpty,
    StatusError = OpenChannelOperatorsStatusError,
    Provider = OpenChannelOperatorsContextsProvider,
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
export default createOpenChannelOperatorsModule;
//# sourceMappingURL=createOpenChannelOperatorsModule.js.map