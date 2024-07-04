import MessageSearchHeader from '../component/MessageSearchHeader';
import MessageSearchList from '../component/MessageSearchList';
import MessageSearchStatusEmpty from '../component/MessageSearchStatusEmpty';
import MessageSearchStatusError from '../component/MessageSearchStatusError';
import MessageSearchStatusLoading from '../component/MessageSearchStatusLoading';
import { MessageSearchContextsProvider } from './moduleContext';
const createMessageSearchModule = function () {
  let {
    Header = MessageSearchHeader,
    List = MessageSearchList,
    StatusError = MessageSearchStatusError,
    StatusLoading = MessageSearchStatusLoading,
    StatusEmpty = MessageSearchStatusEmpty,
    Provider = MessageSearchContextsProvider,
    ...module
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Header,
    List,
    Provider,
    StatusError,
    StatusEmpty,
    StatusLoading,
    ...module
  };
};
export default createMessageSearchModule;
//# sourceMappingURL=createMessageSearchModule.js.map