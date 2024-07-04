import OpenChannelCreateHeader from '../component/OpenChannelCreateHeader';
import OpenChannelCreateProfileInput from '../component/OpenChannelCreateProfileInput';
import OpenChannelCreateStatusLoading from '../component/OpenChannelCreateStatusLoading';
import { OpenChannelCreateContextsProvider } from './moduleContext';
const createOpenChannelCreateModule = function () {
  let {
    Header = OpenChannelCreateHeader,
    ProfileInput = OpenChannelCreateProfileInput,
    Provider = OpenChannelCreateContextsProvider,
    StatusLoading = OpenChannelCreateStatusLoading,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    ProfileInput,
    Provider,
    StatusLoading,
    ...module
  };
};
export default createOpenChannelCreateModule;
//# sourceMappingURL=createOpenChannelCreateModule.js.map