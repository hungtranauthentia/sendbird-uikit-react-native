import OpenChannelHeader from '../component/OpenChannelHeader';
import OpenChannelInput from '../component/OpenChannelInput';
import OpenChannelMessageList from '../component/OpenChannelMessageList';
import OpenChannelStatusEmpty from '../component/OpenChannelStatusEmpty';
import OpenChannelStatusLoading from '../component/OpenChannelStatusLoading';
import { OpenChannelContextsProvider } from './moduleContext';
const createOpenChannelModule = function () {
  let {
    Header = OpenChannelHeader,
    MessageList = OpenChannelMessageList,
    Input = OpenChannelInput,
    StatusLoading = OpenChannelStatusLoading,
    StatusEmpty = OpenChannelStatusEmpty,
    Provider = OpenChannelContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    MessageList,
    Input,
    Provider,
    StatusEmpty,
    StatusLoading,
    ...module
  };
};
export default createOpenChannelModule;
//# sourceMappingURL=createOpenChannelModule.js.map