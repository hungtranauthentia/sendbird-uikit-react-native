import GroupChannelModerationHeader from '../component/GroupChannelModerationHeader';
import GroupChannelModerationMenu from '../component/GroupChannelModerationMenu';
import { GroupChannelModerationContextsProvider } from './moduleContext';
const createGroupChannelModerationModule = function () {
  let {
    Header = GroupChannelModerationHeader,
    Menu = GroupChannelModerationMenu,
    Provider = GroupChannelModerationContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    Menu,
    Provider,
    ...module
  };
};
export default createGroupChannelModerationModule;
//# sourceMappingURL=createGroupChannelModerationModule.js.map