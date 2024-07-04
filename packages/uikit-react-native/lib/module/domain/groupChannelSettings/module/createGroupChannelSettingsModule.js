import GroupChannelSettingsHeader from '../component/GroupChannelSettingsHeader';
import GroupChannelSettingsInfo from '../component/GroupChannelSettingsInfo';
import GroupChannelSettingsMenu from '../component/GroupChannelSettingsMenu';
import { GroupChannelSettingsContextsProvider } from './moduleContext';
const createGroupChannelSettingsModule = function () {
  let {
    Header = GroupChannelSettingsHeader,
    Info = GroupChannelSettingsInfo,
    Menu = GroupChannelSettingsMenu,
    Provider = GroupChannelSettingsContextsProvider,
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
export default createGroupChannelSettingsModule;
//# sourceMappingURL=createGroupChannelSettingsModule.js.map