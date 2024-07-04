import GroupChannelNotificationsHeader from '../component/GroupChannelNotificationsHeader';
import GroupChannelNotificationsView from '../component/GroupChannelNotificationsView';
import { GroupChannelNotificationsContextsProvider } from './moduleContext';
const createGroupChannelNotificationsModule = function () {
  let {
    Header = GroupChannelNotificationsHeader,
    View = GroupChannelNotificationsView,
    Provider = GroupChannelNotificationsContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    View,
    Provider,
    ...module
  };
};
export default createGroupChannelNotificationsModule;
//# sourceMappingURL=createGroupChannelNotificationsModule.js.map