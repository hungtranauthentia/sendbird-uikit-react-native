import GroupChannelHeader from '../component/GroupChannelHeader';
import GroupChannelInput from '../component/GroupChannelInput';
import GroupChannelMessageList from '../component/GroupChannelMessageList';
import GroupChannelStatusEmpty from '../component/GroupChannelStatusEmpty';
import GroupChannelStatusLoading from '../component/GroupChannelStatusLoading';
import GroupChannelSuggestedMentionList from '../component/GroupChannelSuggestedMentionList';
import { GroupChannelContextsProvider } from './moduleContext';
const createGroupChannelModule = function () {
  let {
    Header = GroupChannelHeader,
    MessageList = GroupChannelMessageList,
    Input = GroupChannelInput,
    SuggestedMentionList = GroupChannelSuggestedMentionList,
    StatusLoading = GroupChannelStatusLoading,
    StatusEmpty = GroupChannelStatusEmpty,
    Provider = GroupChannelContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    MessageList,
    Input,
    SuggestedMentionList,
    StatusEmpty,
    StatusLoading,
    Provider,
    ...module
  };
};
export default createGroupChannelModule;
//# sourceMappingURL=createGroupChannelModule.js.map