import OpenChannelSettingsHeader from '../component/OpenChannelSettingsHeader';
import OpenChannelSettingsInfo from '../component/OpenChannelSettingsInfo';
import OpenChannelSettingsMenu from '../component/OpenChannelSettingsMenu';
import { OpenChannelSettingsContextsProvider } from './moduleContext';
const createOpenChannelSettingsModule = function () {
  let {
    Header = OpenChannelSettingsHeader,
    Info = OpenChannelSettingsInfo,
    Menu = OpenChannelSettingsMenu,
    Provider = OpenChannelSettingsContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    Info,
    Menu,
    Provider,
    ...module
  };
};
export default createOpenChannelSettingsModule;
//# sourceMappingURL=createOpenChannelSettingsModule.js.map