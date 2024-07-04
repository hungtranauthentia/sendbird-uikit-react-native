import OpenChannelMutedParticipantsHeader from '../component/OpenChannelMutedParticipantsHeader';
import OpenChannelMutedParticipantsList from '../component/OpenChannelMutedParticipantsList';
import OpenChannelMutedParticipantsStatusEmpty from '../component/OpenChannelMutedParticipantsStatusEmpty';
import OpenChannelMutedParticipantsStatusError from '../component/OpenChannelMutedParticipantsStatusError';
import OpenChannelMutedParticipantsStatusLoading from '../component/OpenChannelMutedParticipantsStatusLoading';
import { OpenChannelMutedParticipantsContextsProvider } from './moduleContext';
const createOpenChannelMutedParticipantsModule = function () {
  let {
    Header = OpenChannelMutedParticipantsHeader,
    List = OpenChannelMutedParticipantsList,
    StatusLoading = OpenChannelMutedParticipantsStatusLoading,
    StatusEmpty = OpenChannelMutedParticipantsStatusEmpty,
    StatusError = OpenChannelMutedParticipantsStatusError,
    Provider = OpenChannelMutedParticipantsContextsProvider,
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
export default createOpenChannelMutedParticipantsModule;
//# sourceMappingURL=createOpenChannelMutedParticipantsModule.js.map