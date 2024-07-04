import OpenChannelModerationHeader from '../component/OpenChannelModerationHeader';
import OpenChannelModerationMenu from '../component/OpenChannelModerationMenu';
import { OpenChannelModerationContextsProvider } from './moduleContext';
const createOpenChannelModerationModule = function () {
  let {
    Header = OpenChannelModerationHeader,
    Menu = OpenChannelModerationMenu,
    Provider = OpenChannelModerationContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    Menu,
    Provider,
    ...module
  };
};
export default createOpenChannelModerationModule;
//# sourceMappingURL=createOpenChannelModerationModule.js.map